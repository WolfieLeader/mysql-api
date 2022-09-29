# How I installed MySQL on my Windows 10:

1.Go to the following link https://dev.mysql.com/downloads/windows/installer/8.0.html
2.You will see two options, one is the normal installer and the other one has extra stuff. Choose the normal installer.
3.Then you'll get prompted with login page, scroll to the bottom and click on "No thanks, just start my download".
4.Download the MySQL installer.
5.Go though the installation process.
6.When you get to "Choose your setup type" select "Custom".
7.Then select "MySQL Server" and "MySQL Workbench".
8.Then click on "Execute".
9.When you get to "Accounts and users" type a password for the root user(keep in mind that special characters will cause problems).
10.When everything is done, open the MySQL Workbench.
11.Click on "Local instance" and try to login with the root user and the password you set.(if you gen an error, try logging in with the root user and no password)
12.Close the MySQL Workbench if the login was successful.
13.Open the CMD and type

```bash
mysql --version
```

If throws an error go to "C:\Program Files\MySQL\MySQL Server 8.0\bin", check if it exists, and set this path in the environment variables of the system, after saving the new path run again the command in the CMD and it should be good.
14.If everything went well, run the following command in the CMD:

```bash
mysql -u root -p
```

15.Then type the password you set for the root user.
16.When you're logged in, run the following command:

```bash
SELECT user FROM mysql.user;
```

17.Then we need to give privileges to the root user, run the following command:

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

if it doesn't work try cutting the @'localhost' part.
18.And finally run the following command:

```bash
FLUSH PRIVILEGES;
```

You should be good to go now😋;
