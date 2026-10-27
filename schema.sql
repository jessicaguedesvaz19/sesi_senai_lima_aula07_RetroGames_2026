create database db_retrogames
use database de_retrogames

create table if not exists jogos (
    id int auto_increment primary key,
    titulo varchar(150) not null,
    plataforma varchar(100) not null,
    desenvolvedora varchar(150) not null,
    imagem_url varchar(500) not null,
    preco decimal(10,2) not null,
    data_cadastro timestamp default current_timestamp
);

insert into jogos (titulo, plataforma, desenvolvedora, imagem_url, preco)
values
('Pac-Man', 'Arcade', 'Namco', 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/5363_7D66C7F21A0BD4A2.jpg?w=1200&h=900&crop=0&quality=90', 49.90),

('Pokémon Red', 'Game Boy', 'Game Freak', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZYezapV3rTMaQMUwfCPWBOSy4AJvPRKIsDXppwpkCPxtFLWugDXLkcXCA&s=10', 149.90),

('Minecraft', 'PC', 'Mojang', 'https://xboxwire.thesourcemediaassets.com/sites/8/2024/05/Hero-bdef2532984d6fcafc40.jpg', 99.90);