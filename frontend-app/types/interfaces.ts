export interface ApiResponse {
    code: number,
    data: any,
    message: string
}

// User and Authentication Interfaces
export interface User {
    uid: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    role: UserRole,
    status: UserStatus,
    created_at: string,
    updated_at: string
}

export interface Credential {
    email: string,
    password: string,
}

export interface LoggedUser {
    user: User,
    profile: UserProfile,
    token: string,
    refreshToken: string,
    permissions: string[]
}

export interface UserProfile {
    id: number,
    profileable: StartupProfile | AcceleratorProfile | HubProfile,
    profileable_type: string
}

export interface RegistrationInfo {
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    password: string;
    password_confirmation: string;
    role: UserRole;
}

export enum UserRole {
    STARTUP_USER = 'startup_user',
    COMMISSION_STAFF = 'commission_staff',
    ADMIN = 'admin'
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
    SUSPENDED = 'suspended'
}

// Startup Interfaces
export interface StartupData {
    id: string,
    name: string,
    registration_number: string,
    sector: string,
    stage: StartupStage,
    description: string,
    date_established: string,
    location: string,
    region: string,
    contact_email: string,
    contact_phone: string,
    website: string,
    social_links: SocialLinks,
    founders: Founder[],
    status: StartupStatus,
    created_at: string,
    updated_at: string
}

export interface Founder {
    id: string,
    name: string,
    role: string,
    email: string,
    phone: string,
    bio: string
}

export interface SocialLinks {
    linkedin?: string,
    twitter?: string,
    facebook?: string,
    instagram?: string
}

export enum StartupStage {
    IDEA = 'idea',
    MVP = 'mvp',
    EARLY_TRACTION = 'early_traction',
    GROWTH = 'growth',
    SCALE = 'scale'
}

export enum StartupStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

// Program Interfaces
export interface Program {
    id: string,
    name: string,
    organizer: string,
    description: string,
    eligibility_criteria: string,
    deadline: string,
    start_date: string,
    end_date: string,
    status: ProgramStatus,
    max_participants: number,
    current_participants: number,
    requirements: string[],
    benefits: string[],
    created_at: string,
    updated_at: string
}

export enum ProgramStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    CLOSED = 'closed',
    COMPLETED = 'completed'
}

export interface ProgramApplication {
    id: string,
    startup_id: string,
    program_id: string,
    status: ApplicationStatus,
    application_date: string,
    review_notes?: string,
    startup: StartupData,
    program: Program
}

export enum ApplicationStatus {
    PENDING = 'pending',
    UNDER_REVIEW = 'under_review',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

// Label Interfaces
export interface Label {
    id: string,
    name: string,
    description: string,
    eligibility_criteria: string,
    requirements: string[],
    benefits: string[],
    status: LabelStatus,
    created_at: string,
    updated_at: string
}

export enum LabelStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DRAFT = 'draft'
}

export interface LabelApplication {
    id: string,
    startup_id: string,
    label_id: string,
    status: ApplicationStatus,
    application_date: string,
    supporting_documents: string[],
    notes: string,
    review_notes?: string,
    startup: StartupData,
    label: Label
}

// Hub and Accelerator Interfaces
export interface HubData {
    hub_name: string,
    total_members: number,
    number_female: number,
    membership_option: string,
    date_establishment: string,
    region_location: string,
    phone_number: string,
    email: string,
    available_programs: string,
    brief: string,
}

export interface AcceleratorData {
    accelerator_name: string,
    uid: number,
    focus_area: number,
    brief_description: string,
    region_location: string,
    phone_number: string,
    email: string,
}

export interface GrassrootProgramsData {
    grassroot_name: string,
    uid: number,
    focus_area: number,
    brief_description: string,
    region_location: string,
    phone_number: string,
    email: string,
}

// Project Interface
export interface Project {
    uid: string,
    category: string,
    title: string,
    year: string,
    verify: boolean,
}

// Profile Interfaces
export interface Profile {
    id: number
    user: User
    commonField1: string
    commonField2: string
}

export interface StartupProfile implements Profile {
    id: number,
    user: User,
    commonField1: string,
    commonField2: string,
    startupSpecificField1: string
}

export interface AcceleratorProfile implements Profile {
    id: number
    user: User,
    commonField1: string
    commonField2: string
    acceleratorSpecificField1: string
}

export interface HubProfile implements Profile {
    id: number,
    user: User,
    commonField1: string,
    commonField2: string,
    hubSpecificField1: string
}

export interface Query {
    profiles(type: string): [Profile]
    profile(id: number): Profile
}

// Form and UI Interfaces
export interface FormField {
    name: string,
    label: string,
    type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'date' | 'file',
    required: boolean,
    options?: { value: string, label: string }[],
    placeholder?: string,
    validation?: string
}

export interface TableColumn {
    key: string,
    label: string,
    sortable?: boolean,
    width?: string
}

export interface FilterOption {
    key: string,
    label: string,
    value: string
}
