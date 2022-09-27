create database api_financeira;

drop table if exists usuarios;

create table usuarios(
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null,
    cpf varchar(11) unique,
    telefone varchar(13) unique
);

drop table if exists clientes;

create table clientes(
    id serial primary key,
    usuario_id integer not null,
    nome text not null,
    email text not null unique, 
    cpf varchar(11) unique,
    telefone varchar(13),
    logradouro text,
    complemento text,
    cep varchar(11),
    bairro text,
    cidade text,
    estado text,
    status boolean not null default true,
    foreign key (usuario_id) references usuarios(id)  
);


drop table if exists cobrancas;

create table cobrancas(
    id serial primary key,
    descricao text not null,
    status boolean not null default true,
    valor integer not null,
    vencimento date not null,
    cliente_id integer not null,
    foreign key (cliente_id) references clientes(id)
);