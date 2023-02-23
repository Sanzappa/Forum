drop database if exists Forum;
create database Forum charset=UTF8 collate utf8_general_ci;
use Forum;

create table users(
    usuario varchar(20) primary key not null,
    nome varchar(50) not null,
    senha varchar(200) not null,
    role boolean not null
);

create table tags(
    tag varchar(50) primary key not null
);

create table post( 
	id integer primary key auto_increment,
	duvida varchar(500) not null,
    usuario varchar(20) not null,
    data date not null,
    foreign key (usuario) references users(usuario)
);

create table postTags(
    id integer primary key auto_increment,
    tag varchar(50) not null,
    idPost integer not null,
    foreign key (tag) references tags(tag),
    foreign key (idPost) references post(id) ON DELETE CASCADE
);

create table comment(
    idComment integer primary key auto_increment,
	idPost integer not null,
	resposta varchar(500) not null,
    usuario varchar(20) not null,
    data date not null,
    foreign key (usuario) references users(usuario),
    foreign key (idPost) references post(id) ON DELETE CASCADE
);

create table answerComment(
    idAnswer integer primary key auto_increment,
    idComment integer not null,
	resposta varchar(500) not null,
    usuario varchar(20) not null,
    data date not null,
    foreign key (usuario) references users(usuario),
    foreign key (idComment) references comment(idComment) ON DELETE CASCADE
);

create view vw_Post as
select u.usuario as usuario,p.id as idPost, p.duvida as postDuvida, p.data as dataPost, t.tag as tag,c.idComment as idComment, c.usuario as usuarioComment, c.resposta as resposta, c.data as dataComment from users u 
inner join post p on u.usuario = p.usuario
inner join postTags t on p.id = t.idPost
inner join comment c on p.id = c.idPost;

create view vw_Comment as
select c.idComment as idComment,a.idAnswer as idAnswer, a.usuario as usuarioComment, a.resposta as resposta, a.data as dataComment from comment c 
inner join answerComment a on c.idComment = a.idComment;


INSERT INTO users VALUES ('Felipe_Gostoso', 'Felipe Serra', 'MTIzNA==', 0);
INSERT INTO users VALUES ('Sanzappa', 'Santiago Conti', 'NDMyMQ==', 1);

INSERT INTO tags VALUES ('javascript');
INSERT INTO tags VALUES ('java');
INSERT INTO tags VALUES ('HTML');
INSERT INTO tags VALUES ('CSS');
INSERT INTO tags VALUES ('C');
INSERT INTO tags VALUES ('Kotlin');
INSERT INTO tags VALUES ('Shell');
INSERT INTO tags VALUES ('PHP');
INSERT INTO tags VALUES ('C#');
INSERT INTO tags VALUES ('C++');
INSERT INTO tags VALUES ('Python');
INSERT INTO tags VALUES ('SAS');

INSERT INTO post VALUES (default, "Como usar fetch?", "Felipe_Gostoso", "2022/11/27");

INSERT INTO postTags VALUES (default, "javascript", 1);

INSERT INTO comment VALUES (default, 1, "Procura no gogogoglo", "Sanzappa", "2022/11/28");
INSERT INTO comment VALUES (default, 1, "Chama no zap", "Sanzappa", "2022/11/28");
INSERT INTO comment VALUES (default, 1, "Não sei", "Sanzappa", "2022/11/28");

INSERT INTO answerComment VALUES (default, 1, "Procura no gogogoglo", "Sanzappa", "2022/11/29");
INSERT INTO answerComment VALUES (default, 3, "Num sei meu, c é Pichurocu", "Sanzappa", "2022/11/29");

SELECT * FROM vw_Post;