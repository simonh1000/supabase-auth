import type { User } from '@supabase/supabase-js';

/*
 * notification status
 */
export enum NStatus {
	// Initial value
	Checking,
	// Browser values
	Default,
	Granted,
	Denied,
	// Firebase value
	Unsupported
	// User has been informed that notifications not possible
	// We can remind them when they are supported
	// UnsupportedAcknowledged,
	// User has requested not to receive notifications
	// SkipNotifications,
}

export function ppNStatus(n: NStatus) {
	return NStatus[n];
}

export enum VotingPage {
	OurVotes,
	VoteForm,
	MyVotes
}

// the contestants on TV
export interface Contestant {
	id: number;
	name: string;
	description: string;
	stillIn: boolean;
	totalVotes: number;
}

// the data needed before we pass to +page.svelte
export interface UserPlayer {
	user: User;
	player: Player;
}

// from Player table
// TODO rename as SupaPlayer
export interface NewPlayer {
	id: string; // from auth table
	name: string;
	email: string;
	intro: string;
	pot: null | number;
	// updated_at
	// created_at
}

// TODO rename as CombinedPlayer
export interface SupaPlayer extends NewPlayer {
	// id: number;
	bestCand: number;
	bestPos: number;
	// joined
	subscriptions: Subscription[];
	votes: Vote[];
	// copied from User
	avatar: string;
}

//
// export interface Prefs {
// 	newOurVotes: boolean;
// }

// export const blankPrefs: Prefs = {
// 	newOurVotes: false
// };

export interface Player extends SupaPlayer {
	// from local environment
	nstatus: NStatus;
	push_token?: string;
	// prefs: Prefs; // local storage settings
}

export const blankPlayer: Player = {
	// NewPlayer
	id: '',
	name: '',
	email: '',
	intro: '',
	pot: null,
	// SupaPlayer
	bestCand: 0,
	bestPos: -1,
	avatar: '',
	subscriptions: [],
	votes: [],
	// App Data
	nstatus: NStatus.Checking
};

// Subscription
export interface Subscription extends NewSubscription {
	id: number;
	created_at: string; // added by saving
}

export interface NewSubscription extends BaseSubscription {
	player_id: number;
}

export interface BaseSubscription {
	token: string;
	platform: string; // OS (just for keeping track of test data)
	url: string; // of page used to subscribe
}

// Vote
export interface Vote extends NewVote {
	id: number;
	// after saving these will definitely exist, but could be null
	vote_2: null | number;
	vote_3: null | number;
}

export interface NewVote {
	player_id: number; // Player.user_id
	week: number;
	vote_1: number;
	// if missing, will become null on save
	vote_2?: null | number;
	vote_3?: null | number;
}

// Admin
export interface AdminSub extends BaseSubscription {
	id: number;
	created_at: string; // added by saving
	player_id: number;
}

export interface AdminVotes {
	id: number;
	name: string;
	weeks: number[];
}

export interface AdminPlayer {
	id: number;
	name: string;
	weeks: number[];
	subs: Subscription[];
}
