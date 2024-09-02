# Course Tracker Web App

Welcome to the Course Tracker web application repository! Course Tracker is a self-managed web application that helps you track courses that you want to learn using Youtube or Vimeo videos. This repository contains the source code for the Course Tracker app, and it's designed to be deployed on platforms like Cloudflare.

## Prerequisites

Before you can deploy and use the Course Tracker web app, you'll need the following:

1. **Cloudflare Account**: You must have an account on [Cloudflare](https://cloudflare.com/). Cloudflare will be used for hosting and deploying the Course Tracker app.

2. **Supabase Account**: You need an account on [Supabase](https://supabase.com/). Supabase will be used to store and manage the data related to courses and videos.

## Deployment

To deploy the Course Tracker app, follow these steps:

1. [Create a new Cloudflare account](https://dash.cloudflare.com/sign-up) if you don't have one.

2. After creating your Cloudflare account, follow these steps to deploy the app:

   - Go to **Workers & Pages** page on your dashboard.
   - Click on the **Create** button.
   - Choose the **Pages** tab to connect to your Github account.
   - Provide access to this repository by connecting it to your GitHub account.
   - Configure the deployment settings as needed (e.g., environment variables).
   - Deploy the app.

3. Once the deployment is complete, Cloudflare will provide you with a unique URL for your deployed Course Tracker app.


> [!NOTE]
> You can deploy this app on different platforms like Vercel. Please read the docs for deploying on those platforms.

## Configuration

Before you start using the deployed Course Tracker app, make sure to set the following environment variables:

- `SUPABASE_URL`: Your Supabase URL.
- `SUPABASE_KEY`: Your Supabase anonymous key.

These environment variables should be configured in your Cloudflare project settings to ensure that the app can connect to your Supabase database.

## Database Setup

To set up the necessary database tables for the Course Tracker app, you can use the following SQL queries in your Supabase project:

**Query 1: Create the `course` Table**

```sql
create table
  course (
    id uuid not null default uuid_generate_v4 (),
    created_at timestamp with time zone null default now(),
    title character varying null,
    user_id uuid null,
    constraint course_pkey primary key (id),
    constraint course_user_id_fkey foreign key (user_id) references auth.users (id)
  );
```

**Query 2: Create the `video` Table**

```sql
create table
  video (
    id uuid not null default uuid_generate_v4 (),
    created_at timestamp with time zone null default now(),
    title text null,
    source text null,
    video_id text null,
    is_watched bool null,
    thumbnail text null,
    row integer null,
    course_id uuid not null,
    user_id uuid not null,
    constraint video_pkey primary key (id),
    constraint video_course_id_fkey foreign key (course_id) references course (id) on delete cascade,
    constraint video_user_id_fkey foreign key (user_id) references auth.users (id)
  );
```

These queries will create the necessary `course` and `video` tables in your Supabase project. The tables are designed to store data related to course and video for your Course Tracker web app. Make sure to set up the appropriate relationships and constraints between these tables as specified in the queries.


> [!CAUTION]
> Please set [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) for your tables if you use it alongside other users.

## Usage

With the Course Tracker app deployed and the database tables created, you can start using it to track courses. Add, update, or delete course records as needed, and the data will be stored securely in your Supabase database.

## Development Tools
- Nuxt 3
- Supabase
- Tailwindcss
- Nuxt UI
- Plyr (Vue Plyr)
- TypeScript (Of Course!)

## Development

If you want to change something in this repository, feel free to do it. For that you need to add a `.env` file containing these two keys:

- `SUPABASE_URL`: Your Supabase URL.
- `SUPABASE_KEY`: Your Supabase anonymous key.

## Acknowledgments

- Thanks to the [Cloudflare](https://cloudflare.com/) and [Supabase](https://supabase.com/) teams for their amazing services.

Happy learning with Course Tracker!

