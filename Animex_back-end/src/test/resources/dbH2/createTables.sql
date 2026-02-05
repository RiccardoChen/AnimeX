create table role
(
    id   bigint generated always as identity primary key,
    name varchar(255) not null unique
);

create table account
(
    id bigint generated always as identity primary key,
    username varchar(255) not null unique ,
    email varchar(255) not null unique ,
    password varchar(255) not null,
    role_id bigint not null ,
    foreign key (role_id) references role(id)
);

create table profile
(
    id bigint generated always as identity primary key,
    name varchar(255) not null,
    sex varchar(255),
    birthday date,
    account_id bigint unique ,
    foreign key (account_id) references account(id)
);

create table anime
(
    id bigint generated always as identity primary key,
    name varchar(255) not null  unique ,
    category varchar(255),
    episode int,
    description text,
    release_year int,
    img_url varchar(255),
    video_url varchar(255)
);


create table profile_anime
(
    profile_id bigint not null ,
    anime_id bigint not null ,
    primary key (profile_id, anime_id),
    foreign key (profile_id) references profile(id),
    foreign key (anime_id) references anime(id)
)