/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
     connection: 'serverMySQL'
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: 443,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

  ssl: {
    ca: require('fs').readFileSync(require('path').resolve('/etc/letsencrypt/live/team03.hackardennes.com/chain.pem')),
    key: require('fs').readFileSync(require('path').resolve('/etc/letsencrypt/live/team03.hackardennes.com/privkey.pem')),
    cert: require('fs').readFileSync(require('path').resolve('/etc/letsencrypt/live/team03.hackardennes.com/cert.pem'))
  }

};
