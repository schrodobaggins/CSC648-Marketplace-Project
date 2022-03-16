# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP
2. SSH username
3. SSH password or key.
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used.
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
5. Database username
6. Database password
7. Database name (basically the name that contains all your tables)
8. Instructions on how to use the above information.

|    Item                  | Credentials                                                           |
|          :---:           |           :---:                                                       |
|    Server URL and IP     | dropsell.gq, 18.144.88.133                                            |
|    SSH URL               | ec2-18-144-88-133.us-west-1.compute.amazonaws.com                     |
|    SSH username          | ubuntu                                                                |
|    SSH key               | /credentials/csc648.cer                                               |
|    Database URL and port | rds-mysql-joses-angels.cgt4l91wscet.us-west-1.rds.amazonaws.com, 3306 |
|    Database username     | admin                                                                 |
|    Database password     | oM9QuhdFhNMVUyMFU4ha                                                  | 
|    Database name         | mysql_ja                                                              | 

Connecting to AWS EC2 instance: 

1. Before starting any of the following steps, make sure to first clone the git repository. 
2. Next, if you'd like to connect to the AWS EC2 instance, `cd` into the freshly cloned git repository, then `cd` again into the credentials folder. 
3. In /credentials is csc648.cer, the RSA key used to connect to the remote EC2 instance. It is recommended to use `pwd` to get the path to the current working directory since this will be needed when using SSH.
4. To connect to the remote EC2 instance, use the following command: `sudo ssh -i /your/path/to/the/git/repo/csc648-848-sw-engineering-sum21-T03/credentials/csc648.cer ec2-18-144-88-133.us-west-1.compute.amazonaws.com`.
5. If prompted to enter a password, enter your password. 
6. After, you will be redirected to the remote EC2 instance. 

Connecting to AWS RDS MySQL database:

1. Before continuing, make sure you have MySQL Workbench installed. (https://dev.mysql.com/downloads/workbench/)
2. Next, open up MySQL Workbench client. Select 'Database' in the nav bar at the top. Then click 'Connect to database...'
3. Choose 'Standard(TCP/IP) as the connection method.
4. Under the 'Parameters' tab, enter `rds-mysql-joses-angels.cgt4l91wscet.us-west-1.rds.amazonaws.com` as the hostname.
5. Enter `3306` as the port.
6. Enter `admin` as the username.
7. Click on 'Store in Keychain...', then input `oM9QuhdFhNMVUyMFU4ha` as the password. Click, 'OK', then 'OK' again.
8. You are now able to interact with the MySQL database. 
9. To start, we have created a single table, titled 'users'. If you'd like to see its contents, first double click on mysql_ja under schemas to make it the default DB. Then run a SQL statement like `SELECT * FROM users;` to see the all users.


# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
