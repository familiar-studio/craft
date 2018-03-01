const gulp = require("gulp");
const fs = require("fs");
const exec = require("child_process").execSync;

const server = require("./server.json");

gulp.task("craft", function() {
  exec("curl -L http://craftcms.com/latest.zip?accept_license=yes > craft.zip");
  exec("unzip craft.zip -d .tmp");
  exec("rsync -r .tmp/craft/app craft");
  exec("rm -R .tmp");
  exec("mkdir -p craft/storage");
  exec("rm craft.zip");
});

gulp.task("assets", function() {
  exec('echo "** Syncing Assets"');
  exec(
    'rsync -a -z -e "ssh -p 22" "forge@' +
      server.ip +
      ":/home/forge/" +
      server.host +
      '/web/assets" ./web --progress',
    { stdio: [0, 1, 2] }
  );
});

gulp.task("db", function() {
  var backupName = Date.now() + ".sql";

  // create database if doesnt exist
  // exec(
  //   'mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS ' +
  //     server.dbName +
  //     '"'
  // );

  // make directories for backups if you need them
  exec("mkdir -p backups/local");
  exec("mkdir -p backups/remote");

  //backup existing local db
  exec(
    "mysqldump -h localhost -u root -proot " +
      server.dbName +
      " > ./backups/local/" +
      backupName
  );
  console.log("Backed up local db");

  // dump remote db
  exec(
    "ssh forge@" +
      server.ip +
      ' "mysqldump ' +
      server.dbName +
      " --quote-names --opt --hex-blob --add-drop-database -u forge > /tmp/" +
      backupName +
      '"'
  );

  // copy file to local computer
  exec(
    "scp -P 22 -- forge@" +
      server.ip +
      ':"/tmp/' +
      backupName +
      '" "./backups/remote/' +
      backupName +
      '"'
  );
  console.log("Dumped and backed up remote db");

  // import the backedup file into the local database
  exec(
    'mysql -u root -proot "' +
      server.dbName +
      '" < "./backups/remote/' +
      backupName +
      '"'
  );
  console.log("Copied remote dump into local database");
});

gulp.task("setup", ["craft", "db", "assets"]);
gulp.task("sync", ["db", "assets"]);
