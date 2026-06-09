"use client";

import React, { useState } from "react";
import { 
  updateJourneyStatus, 
  updateMatchStatus, 
  updateDateNotes, 
  createDateRecord, 
  proposeMatch
} from "@/src/app/profile/actions";
import { MatchStatus, DateStatus, JourneyStatus } from "@/src/generated/prisma";

// Types for the component
type MatchedProfile = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  city: string;
  designation: string;
  currentCompany: string;
  maritalStatus: string;
};

type DateRecord = {
  id: string;
  dateScheduledAt: Date;
  status: DateStatus;
  notes: string | null;
  createdAt: Date;
};

type NormalizedMatch = {
  id: string;
  status: MatchStatus;
  matchedProfile: MatchedProfile;
  dates: DateRecord[];
  createdAt: Date;
};

type OtherProfileSummary = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  gender: string;
  designation: string;
};

interface MatchmakingWorkspaceProps {
  profileId: string;
  clientEmail: string;
  clientName: string;
  currentJourneyStatus: JourneyStatus;
  matches: NormalizedMatch[];
  otherProfiles: OtherProfileSummary[];
}

export default function MatchmakingWorkspace({
  profileId,
  clientEmail,
  clientName,
  currentJourneyStatus,
  matches,
  otherProfiles,
}: MatchmakingWorkspaceProps) {
  // Loading & Notification States
  const [loading, setLoading] = useState<string | null>(null); // tracks action being performed
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form States
  const [selectedProposalId, setSelectedProposalId] = useState<string>("");
  const [activeNewDateMatchId, setActiveNewDateMatchId] = useState<string | null>(null);
  const [newDateDateTime, setNewDateDateTime] = useState<string>("");
  const [newDateNotes, setNewDateNotes] = useState<string>("");
  const [newDateStatus, setNewDateStatus] = useState<DateStatus>("SCHEDULED");

  // Edit Date Notes States
  const [editingDateId, setEditingDateId] = useState<string | null>(null);
  const [editNotesText, setEditNotesText] = useState<string>("");
  const [editDateStatus, setEditDateStatus] = useState<DateStatus>("COMPLETED");

  const showNotification = (success: boolean, msg: string) => {
    if (success) {
      setSuccessMsg(msg);
      setErrorMsg(null);
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setErrorMsg(msg);
      setSuccessMsg(null);
      setTimeout(() => setErrorMsg(null), 6000);
    }
  };

  // Actions
  const handleJourneyStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value as JourneyStatus;
    setLoading("journey");
    const res = await updateJourneyStatus(profileId, nextStatus);
    setLoading(null);
    if (res.success) {
      showNotification(true, `Journey status updated to ${nextStatus.replaceAll("_", " ")}`);
    } else {
      showNotification(false, res.error || "Failed to update journey status");
    }
  };

  const handleMatchStatusChange = async (matchId: string, nextStatus: MatchStatus) => {
    setLoading(`match-${matchId}`);
    const res = await updateMatchStatus(matchId, nextStatus);
    setLoading(null);
    if (res.success) {
      showNotification(true, `Match status updated to ${nextStatus}`);
    } else {
      showNotification(false, res.error || "Failed to update match status");
    }
  };

  const handleProposeMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProposalId) return;
    setLoading("propose");
    const res = await proposeMatch(profileId, selectedProposalId);
    setLoading(null);
    if (res.success) {
      showNotification(true, "Successfully proposed connection!");
      setSelectedProposalId("");
    } else {
      showNotification(false, res.error || "Failed to propose connection");
    }
  };

  // Email trigger logic: opens the native email program prefilled
  const handleTriggerMailTo = (matchedUser: MatchedProfile, matchedAge: number) => {
    const shareableLink = `${window.location.origin}/profile?id=${matchedUser.id}`;
    const subject = `Premium Match Recommendation: Meet ${matchedUser.firstName}`;
    const body = `Dear ${clientName},

I hope you are doing well. I wanted to share a high-potential recommendation from our premium matrimonial pool.

We have proposed a match for you: ${matchedUser.firstName} ${matchedUser.lastName}, a ${matchedAge}-year-old ${matchedUser.designation} at ${matchedUser.currentCompany} in ${matchedUser.city}.

You can view their private verified profile here:
${shareableLink}

Please let me know if you would like us to coordinate an introductory conversation.

Warm regards,
TDC Matchmaking Team`;

    const mailtoUrl = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    showNotification(true, `Triggered native mail client to send ${matchedUser.firstName}'s bio to ${clientName}.`);
  };

  const handleCreateDate = async (matchId: string) => {
    if (!newDateDateTime) {
      showNotification(false, "Please specify date and time");
      return;
    }
    setLoading(`create-date-${matchId}`);
    const res = await createDateRecord(matchId, newDateDateTime, newDateNotes, newDateStatus);
    setLoading(null);
    if (res.success) {
      showNotification(true, "Successfully logged new date / meetup!");
      setActiveNewDateMatchId(null);
      setNewDateDateTime("");
      setNewDateNotes("");
      setNewDateStatus("SCHEDULED");
    } else {
      showNotification(false, res.error || "Failed to log date");
    }
  };

  const handleSaveEditDate = async (dateId: string) => {
    setLoading(`edit-date-${dateId}`);
    const res = await updateDateNotes(dateId, editNotesText, editDateStatus);
    setLoading(null);
    if (res.success) {
      showNotification(true, "Date log updated!");
      setEditingDateId(null);
    } else {
      showNotification(false, res.error || "Failed to update date log");
    }
  };

  const startEditingDate = (date: DateRecord) => {
    setEditingDateId(date.id);
    setEditNotesText(date.notes || "");
    setEditDateStatus(date.status);
  };

  // Stats Calculations
  const totalConnections = matches.length;
  const totalDates = matches.reduce((acc, m) => acc + m.dates.length, 0);

  // Filter out profiles that are already matched
  const matchedIds = new Set(matches.map(m => m.matchedProfile.id));
  const availableProposals = otherProfiles.filter(p => !matchedIds.has(p.id));

  // Date formatter helper
  const formatDate = (dateVal: any) => {
    const d = new Date(dateVal);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8 font-luxury-sans">
      {/* Notifications */}
      {successMsg && (
        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 text-emerald-800 text-xs uppercase tracking-wider transition-all duration-300">
          <p className="font-semibold">Success</p>
          <p className="mt-1 normal-case tracking-normal">{successMsg}</p>
        </div>
      )}
      {errorMsg && (
        <div className="bg-rose-50 border-l-4 border-rose-600 p-4 text-rose-800 text-xs uppercase tracking-wider transition-all duration-300">
          <p className="font-semibold">Error</p>
          <p className="mt-1 normal-case tracking-normal">{errorMsg}</p>
        </div>
      )}

      {/* Overview Stats & Journey Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E5E2DA] p-6 flex flex-col justify-between">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Total Connections
          </p>
          <p className="mt-4 text-5xl font-luxury-serif text-zinc-900 leading-none">
            {totalConnections}
          </p>
          <p className="mt-2 text-[10px] text-zinc-400">Matches linked in CRM</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] p-6 flex flex-col justify-between">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Total Dates Logged
          </p>
          <p className="mt-4 text-5xl font-luxury-serif text-zinc-900 leading-none">
            {totalDates}
          </p>
          <p className="mt-2 text-[10px] text-zinc-400">Meetups scheduled or done</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] p-6 flex flex-col justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Customer Journey Stage
            </p>
            <div className="mt-3 inline-block bg-zinc-900 text-white text-[10px] uppercase tracking-[0.2em] px-2.5 py-1">
              {currentJourneyStatus.replaceAll("_", " ")}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[9px] uppercase tracking-wider text-zinc-400 mb-1">
              Change Client Status
            </label>
            <select
              value={currentJourneyStatus}
              onChange={handleJourneyStatusChange}
              disabled={loading === "journey"}
              className="w-full bg-[#F7F5F0] border border-[#E5E2DA] px-3 py-2 text-xs text-zinc-800 focus:outline-none rounded-none"
            >
              <option value="NEW">New Client</option>
              <option value="PROFILE_REVIEW">Profile Review</option>
              <option value="MATCHING">Matching Stage</option>
              <option value="MATCH_SENT">Match Sent</option>
              <option value="MEETING_SCHEDULED">Meeting Scheduled</option>
              <option value="IN_DISCUSSION">In Discussion</option>
              <option value="CLOSED">Closed / Settled</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Matchmaker Future Integration Box */}
      <div className="bg-white border border-[#E5E2DA] p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-luxury-serif text-lg text-zinc-900 font-medium">✨ AI Matchmaker Suite</h4>
          <p className="text-[11px] text-zinc-500 mt-1">Automatically scan preferred profile criteria using deep reasoning models.</p>
        </div>
        <button
          onClick={() => showNotification(true, "AI Matching Engine integration is scheduled for Phase 2. Utilizing manual matchmaking tools for now.")}
          className="px-4 py-2 border border-zinc-950 text-zinc-955 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-zinc-950 hover:text-white transition-all rounded-none cursor-pointer"
        >
          Run AI Matchmaker
        </button>
      </div>

      {/* Propose Connection Bar */}
      <div className="bg-white border border-[#E5E2DA] p-6">
        <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-900 font-semibold mb-4">
          Propose New Match / Connection
        </h3>
        {availableProposals.length === 0 ? (
          <p className="text-xs text-zinc-500">No other compatible profiles available to match at this time.</p>
        ) : (
          <form onSubmit={handleProposeMatch} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">
                Select Client Profile
              </label>
              <select
                value={selectedProposalId}
                onChange={(e) => setSelectedProposalId(e.target.value)}
                required
                className="w-full bg-[#F7F5F0] border border-[#E5E2DA] px-3 py-2.5 text-xs text-zinc-800 focus:outline-none rounded-none"
              >
                <option value="">-- Choose Profile --</option>
                {availableProposals.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.firstName} {p.lastName} ({p.gender === "MALE" ? "M" : "F"}, {p.city}) - {p.designation}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading === "propose" || !selectedProposalId}
              className="w-full sm:w-auto bg-zinc-955 text-white border border-zinc-955 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
            >
              {loading === "propose" ? "Connecting..." : "Propose Match"}
            </button>
          </form>
        )}
      </div>

      {/* Matches Grid / Stack */}
      <div className="space-y-6">
        <h3 className="text-sm uppercase tracking-[0.25em] text-zinc-900 border-b border-[#E5E2DA] pb-2">
          Current Connection Records
        </h3>

        {matches.length === 0 ? (
          <div className="bg-white border border-[#E5E2DA] p-12 text-center">
            <p className="text-zinc-500 text-sm font-luxury-serif italic">No match connections created for this client yet.</p>
            <p className="text-zinc-400 text-xs mt-2">Use the proposal tool above to initiate a match connection.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => {
              const matchedUser = match.matchedProfile;
              const isMatchLoading = loading === `match-${match.id}`;

              // Birth date helper to get age
              const birthDate = new Date(matchedUser.dateOfBirth);
              const today = new Date();
              let matchedAge = today.getFullYear() - birthDate.getFullYear();
              const m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                matchedAge--;
              }

              return (
                <div key={match.id} className="bg-white border border-[#E5E2DA] p-6 md:p-8">
                  {/* Match Profile Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#E5E2DA] pb-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500">Connected Candidate</span>
                      <h4 className="mt-1 font-luxury-serif text-3xl text-zinc-900">
                        {matchedUser.firstName} {matchedUser.lastName}
                      </h4>
                      <p className="text-xs text-zinc-600 mt-1.5">
                        {matchedAge} years old • {matchedUser.city} • {matchedUser.maritalStatus.replaceAll("_", " ")}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {matchedUser.designation} at {matchedUser.currentCompany}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <label className="block text-[9px] uppercase tracking-wider text-zinc-400">
                        Match Status
                      </label>
                      <select
                        value={match.status}
                        onChange={(e) => handleMatchStatusChange(match.id, e.target.value as MatchStatus)}
                        disabled={isMatchLoading}
                        className={`w-full text-xs font-semibold uppercase tracking-wider border px-3 py-2 focus:outline-none rounded-none ${
                          match.status === "ACCEPTED" 
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                            : match.status === "DECLINED" 
                            ? "bg-rose-50 text-rose-800 border-rose-200" 
                            : "bg-[#F7F5F0] text-zinc-700 border-[#E5E2DA]"
                        }`}
                      >
                        <option value="PROPOSED">Proposed</option>
                        <option value="INTEREST_EXPRESSED">Interest Expressed</option>
                        <option value="ACCEPTED">Accepted / Active Match</option>
                        <option value="DECLINED">Declined / Rejected</option>
                        <option value="ON_HOLD">On Hold</option>
                        <option value="DISCONNECTED">Disconnected</option>
                      </select>
                      
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <a 
                          href={`/profile?id=${matchedUser.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-center block text-[9px] uppercase tracking-wider text-zinc-500 hover:text-zinc-900 border border-[#E5E2DA] py-1.5 hover:border-zinc-900 transition-colors"
                        >
                          View Bio ↗
                        </a>
                        <button
                          onClick={() => handleTriggerMailTo(matchedUser, matchedAge)}
                          className="text-center block text-[9px] uppercase tracking-wider bg-zinc-900 text-white py-1.5 hover:bg-zinc-800 transition-colors font-semibold rounded-none cursor-pointer"
                        >
                          Email Bio ✉
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dates & Notes Section */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                        Dates & Meetings Logs ({match.dates.length})
                      </h5>
                      {activeNewDateMatchId !== match.id && (
                        <button
                          onClick={() => {
                            setActiveNewDateMatchId(match.id);
                            // Set a default datetime: 2 days from now at 7 PM local
                            const defaultDate = new Date();
                            defaultDate.setDate(defaultDate.getDate() + 2);
                            defaultDate.setHours(19, 0, 0, 0);
                            setNewDateDateTime(defaultDate.toISOString().slice(0, 16));
                          }}
                          className="text-[10px] uppercase tracking-wider text-zinc-950 font-semibold border-b border-zinc-950 hover:text-zinc-600 hover:border-zinc-600 transition-colors"
                        >
                          + Log Date
                        </button>
                      )}
                    </div>

                    {/* New Date Inline Form */}
                    {activeNewDateMatchId === match.id && (
                      <div className="bg-[#F7F5F0] border border-[#E5E2DA] p-4 mb-4 space-y-4">
                        <div className="flex justify-between items-center border-b border-[#E5E2DA] pb-2">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-zinc-900">Log A New Meeting / Date</span>
                          <button 
                            type="button"
                            onClick={() => setActiveNewDateMatchId(null)}
                            className="text-[10px] text-zinc-400 hover:text-zinc-600"
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1">Date & Time</label>
                            <input
                              type="datetime-local"
                              value={newDateDateTime}
                              onChange={(e) => setNewDateDateTime(e.target.value)}
                              className="w-full bg-white border border-[#E5E2DA] p-2 text-xs focus:outline-none rounded-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1">Initial Status</label>
                            <select
                              value={newDateStatus}
                              onChange={(e) => setNewDateStatus(e.target.value as DateStatus)}
                              className="w-full bg-white border border-[#E5E2DA] p-2 text-xs focus:outline-none rounded-none"
                            >
                              <option value="SCHEDULED">Scheduled</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1">Admin Notes / Date Feedback</label>
                          <textarea
                            value={newDateNotes}
                            onChange={(e) => setNewDateNotes(e.target.value)}
                            rows={3}
                            placeholder="Add details about location, scheduling, or feedback from both parties after the date..."
                            className="w-full bg-white border border-[#E5E2DA] p-2.5 text-xs focus:outline-none rounded-none"
                          />
                        </div>
                        <button
                          type="button"
                          disabled={loading === `create-date-${match.id}`}
                          onClick={() => handleCreateDate(match.id)}
                          className="bg-zinc-900 text-white text-[10px] uppercase tracking-wider font-semibold px-4 py-2 hover:bg-zinc-800 transition-colors rounded-none"
                        >
                          {loading === `create-date-${match.id}` ? "Saving..." : "Save Date Log"}
                        </button>
                      </div>
                    )}

                    {/* Dates List */}
                    {match.dates.length === 0 ? (
                      <p className="text-xs text-zinc-400 italic">No dates have been logged for this connection yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {[...match.dates]
                          .sort((a, b) => new Date(b.dateScheduledAt).getTime() - new Date(a.dateScheduledAt).getTime())
                          .map((date) => {
                            const isEditing = editingDateId === date.id;
                            const isSaving = loading === `edit-date-${date.id}`;

                            return (
                              <div key={date.id} className="border border-[#E5E2DA] p-4 bg-[#FBFBFA]">
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E2DA] pb-2 mb-2">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-zinc-955 font-luxury-sans">
                                      {formatDate(date.dateScheduledAt)}
                                    </span>
                                    <span className={`text-[8px] uppercase tracking-wider px-2 py-0.5 font-semibold ${
                                      date.status === "COMPLETED"
                                        ? "bg-zinc-900 text-white"
                                        : date.status === "CANCELLED"
                                        ? "bg-rose-100 text-rose-800"
                                        : "bg-amber-100 text-amber-900"
                                    }`}>
                                      {date.status}
                                    </span>
                                  </div>

                                  {!isEditing && (
                                    <button
                                      onClick={() => startEditingDate(date)}
                                      className="text-[9px] uppercase tracking-wider text-zinc-500 hover:text-zinc-955 hover:underline"
                                    >
                                      Edit Notes / Status
                                    </button>
                                  )}
                                </div>

                                {isEditing ? (
                                  <div className="space-y-3 pt-1">
                                    <div className="flex items-center gap-4">
                                      <label className="text-[9px] uppercase tracking-wider text-zinc-500">Date Status:</label>
                                      <select
                                        value={editDateStatus}
                                        onChange={(e) => setEditDateStatus(e.target.value as DateStatus)}
                                        className="bg-white border border-[#E5E2DA] text-xs px-2 py-1 focus:outline-none rounded-none"
                                      >
                                        <option value="SCHEDULED">Scheduled</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                      </select>
                                    </div>
                                    <textarea
                                      value={editNotesText}
                                      onChange={(e) => setEditNotesText(e.target.value)}
                                      rows={3}
                                      className="w-full bg-white border border-[#E5E2DA] p-2 text-xs focus:outline-none rounded-none"
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        disabled={isSaving}
                                        onClick={() => handleSaveEditDate(date.id)}
                                        className="bg-zinc-900 text-white text-[9px] uppercase tracking-wider font-semibold px-3 py-1.5 hover:bg-zinc-800 transition-colors rounded-none"
                                      >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingDateId(null)}
                                        className="border border-[#E5E2DA] text-zinc-600 text-[9px] uppercase tracking-wider font-semibold px-3 py-1.5 hover:bg-[#F7F5F0] transition-colors rounded-none"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-xs text-zinc-700 leading-relaxed whitespace-pre-wrap">
                                    {date.notes ? (
                                      date.notes
                                    ) : (
                                      <span className="text-zinc-400 italic">No notes recorded for this date. Click Edit to add details.</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
