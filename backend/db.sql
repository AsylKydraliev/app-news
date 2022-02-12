create schema asylbek_kydraliev collate utf8_general_ci;

use asylbek_kydraliev;

create table posts
(
    id      int auto_increment
        primary key,
    title   varchar(255) not null,
    content text         not null,
    image   varchar(32)  null,
    date    timestamp    null
);

create table comments
(
    id      int auto_increment
        primary key,
    post_id int  not null,
    author  text null,
    comment text not null,
    constraint comments_posts_id_fk
        foreign key (post_id) references posts (id)
            on delete cascade
);

insert into posts (id, title, content, image, date)
values  (7, 'new', 'new', 'vda0pXRrp0m_W6LMAQelq.jpg', '2022-02-12 18:30:37'),
        (8, 'new news', 'lorem ipsum', '2H75ia3hSXMIIYXNqlLYk.jpeg', '2022-02-12 18:52:05'),
        (9, 'new post', 'new content', 'mFfUAnEKthWsYdZHbXaYW.jpg', '2022-02-12 19:29:19'),
        (10, 'nnnn', 'nnnnn', '7ZzNfDcDuFThc7t_P4IEp.jpeg', '2022-02-12 19:50:45');

insert into comments (id, post_id, author, comment)
values  (33, 7, 'new author', 'new'),
        (34, 7, 'new', 'new'),
        (36, 7, 'ddddd', 'new'),
        (37, 7, 'new author', 'neweeeee'),
        (38, 8, 'new author', 'new'),
        (40, 9, 'new author', 'neweeee');
