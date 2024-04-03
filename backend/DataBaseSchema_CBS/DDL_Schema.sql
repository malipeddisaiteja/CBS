-- create db
create database cbs;
use cbs;


-- customer table
drop table if exists customer;
create table customer (
id integer(10) primary key auto_increment ,
custid varchar(10) unique,
password varchar(16),
firstname varchar(50),
middlename varchar(50),
lastname varchar(50),
mobileno varchar(10) unique,
emailid varchar(50) unique,
dob date,
fathername varchar(150),
mothername varchar(150),
pan varchar(10) unique,
aadhaarid integer(16) unique,
address text,
city varchar(20),
state varchar(20),
country varchar(20),
pin integer(6),
createdat datetime,
createdby varchar(150),
updatedat datetime,
updatedby varchar(150),
isactive boolean
);
create index idx_customer_custid on customer(custid);
select * from customer;


-- account table
drop table if exists account;
create table account (
id integer(10) primary key auto_increment,
accountno bigint unique,
custid varchar(10) ,
ifsccode varchar(11),
branch varchar(20),
type varchar(20),
category varchar(10),
balance float,
upiid varchar(50) unique,
nominee1 varchar(150),
nominee2 varchar(150),
enablednetbanking boolean,
createdat datetime,
createdby varchar(150),
closedat datetime,
closedby varchar(150),
last_tx_date datetime,
isactive boolean,
foreign key (custid) references customer(custid)
);
create index idx_account_accountno on account(accountno);
create index idx_account_custid on account(custid);


-- transaction table
drop table if exists transaction;
create table transaction(
	id integer(10) PRIMARY KEY AUTO_INCREMENT,
    tx_ref_no varchar(16) NOT NULL,
    accountno bigint,
    type varchar(20),
    amount float,
    balance float,
    tx_at datetime,
    tx_from bigint ,
    tx_to bigint,
    tx_mode varchar(20),
    tx_status varchar(20),
    interestamount float,
    foreign key(accountno) references account(accountno)
);
create index idx_transaction_tx_ref_no on transaction(tx_ref_no);
create index idx_transaction_accountno on transaction(accountno);


-- employee table
drop table if exists employee;
create table employee(
id integer(10) primary key auto_increment,
empid integer(10) unique,
password varchar(16),
firstname varchar(50),
middlename varchar(50),
lastname varchar(50),
mobileno varchar(10) unique,
emailid varchar(50) unique,
dob date,
createdat datetime,
createdby varchar(150),
updatedat datetime,
updatedby varchar(150),
isactive boolean
);
create index idx_employee_empid on employee(empid);

