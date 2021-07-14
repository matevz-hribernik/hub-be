/**
 * Created by EkaterinaAcc on 21-Oct-15.
 */
var settings = require("../settings.js");
const neo4j = require('neo4j-driver')
const driver = neo4j.driver(settings.neo4jSettings.uri, neo4j.auth.basic(settings.neo4jSettings.user,settings.neo4jSettings.password))


var exacuteQuery = async function(Query, callback){
    try {
        driver.verifyConnectivity()
        session = driver.session()
    }catch (e){
        callback("ERROR IN exacuteQuery() NEO4JMODEL.JS - conncetion-session", null);
        console.log(e);
    }
    try {
        let result = await session.run(
            Query
        )
        callback(null, result);
    } catch (e){
        callback("ERROR IN exacuteQuery() NEO4JMODEL.JS-query", null);
        console.log (e)
    } finally {
        await session.close()
    }
    //await driver.close();
};

// const result = await session.run(
//     'CREATE (a:Person {name: $name}) RETURN a',
//     { name: personName }
//   )

var exacuteQueryWithArgs = async function(Query, data,  callback){

    try {
        driver.verifyConnectivity()
        session = driver.session()
        let result = await session.run(
            Query, data
        )
        callback(null, result);
    } catch (e) {
        callback("ERROR IN exacuteQueryWithArgs() NEO4JMODEL.JS", null);
        console.log(e)
    } finally {
        await session.close()
    }
};
var exacuteQueryWithArgs_noClose = async function(Query, data,  callback){

    try {
        driver.verifyConnectivity()
        session = driver.session()
        let result = await session.run(
            Query, data
        )
        callback(null, result);
    } catch (e) {
        callback("ERROR IN exacuteQueryWithArgs() NEO4JMODEL.JS", null);
        console.log(e)
    } finally {
        //await session.close()
    }
};

module.exports.exacuteQuery = exacuteQuery;
module.exports.exacuteQueryWithArgs = exacuteQueryWithArgs;
module.exports.exacuteQueryWithArgs_noClose = exacuteQueryWithArgs_noClose;
// var datetime = new Date();
//     console.log(isNaN(datetime));
//     console.log(String(datetime));
// exacuteQuery('MATCH (s:Subject) where ID(s)=3 return s.firstname, s.lastname, s.gender, s.birthdate, s.placeofbirth, s.countryofbirth, s.UUID, s.remark' , function(err, res){
//     if(err!=null){
//         console.log(err);
//     }else{
//         if (res.records.length>0){
//             console.log(res);
//             // res.records.forEach(record => {
//             //     //console.log(record)
//             //     console.log("Conn")
//             //     record.forEach(node => {
//             //         if (node.type != undefined){
//             //             console.log(node.type +" "+ Number(node.identity))
//             //         }else{
//             //             console.log(node.labels[0] +" "+ Number(node.identity))
//             //         }
//             //     });
//             // });
//         }else{console.log("notring found")}
//     }
// })

process.on('exit', function() {
    driver.close();
    console.log('driver closed')
    console.log('exit');
});
process.on('SIGINT', function() {
    //console.log('SIGINT');
    process.exit();
});
