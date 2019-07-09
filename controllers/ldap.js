var ldap = require('ldapjs');
const org = "ou=kwii,dc=kwii,dc=unal,dc=edu,dc=co";

module.exports = function(username, password){

    var client = ldap.createClient({
        url: "ldap://" + process.env.LDAP_URL
    });
    
    client.bind("cn=admin,dc=kwii,dc=unal,dc=edu,dc=co", "admin", function(err) {
        console.log(err);
        return false;
    });
    
    var search_options = {
        scope: "sub",
        filter: "&(cn=" + username + ")"
    };

    client.search(org, search_options, function(err, res){
        console.log(res);
        if(err){
            console.log("An error has ocurred on LDAP search");
        }else{
            res.on('searchEntry', function(entry) {
                console.log('entry: ' + JSON.stringify(entry.object));
                return password == entry.object.userPassword;
            });
        }
    })

    return false;
}