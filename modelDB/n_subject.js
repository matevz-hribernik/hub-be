/**
 * Created by EkaterinaAcc on 27-Nov-16.
 */

var neo4j = require("./neo4jModel.js");
var settings = require("../settings.js");



//Make new user
//CREATE (n:Subject { firstname: 'Matevž', lastname:'Hribernik', birthdate: date('1995-02-02'), placeofbirth: 'Celje', countryofbirth: 'Slovenia', gender: 'Male', UUID:''????, remark:'developer' })
module.exports.postSubject = function(req,  callback){
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var Remark = req.body.Remark;
    var BirthDay = req.body.BirthDay;
    var Country = req.body.Country;
    var Place = req.body.Place;
    var Sex = req.body.Gender;
    var UUID = "auto generate"; //TODO
    console.log(FirstName);

    if (!FirstName || !LastName || !Remark) {
        callback({status:"NOK", error:"Name, LastName and Remark are required."})
    }else{
        var query = "CREATE (n:Subject { firstname: $name, lastname: $lastname, birthdate: date($birth_day), placeofbirth: $birth_place, countryofbirth: $birth_country, gender: $gender, UUID:$id, remark: $remark })";
        var data = { name: FirstName,
                    lastname: LastName,
                    birth_day: BirthDay,
                    birth_place: Place,
                    birth_country: Country,
                    gender: Sex,
                    id: UUID,
                    remark: Remark};
        neo4j.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }
};


module.exports.getAllSubject = function(callback){
    //var query = "MATCH (s:Subject) return s"; 
    var query ="MATCH (s:Subject) return id(s), s.firstname, s.lastname, s.gender, s.birthdate, s.placeofbirth, s.countryofbirth, s.UUID, s.remark"
    neo4j.exacuteQuery(query, function(err, res){
        if(!err){
            //TODO ONLY what is needed in the frontend
            var res_data=[];
            res.records.forEach(subject => {
                console.log(subject.get("s.firstname"))
                var firstname = subject.get("s.firstname");
                var lastname = subject.get("s.lastname");
                var birthdate = new Date(subject.get("s.birthdate"));
                var gender = subject.get("s.gender");
                var placeofbirth = subject.get("s.placeofbirth");
                var uuid = subject.get("s.UUID");
                var remark = subject.get("s.remark");
                var countryofbirth = subject.get("s.countryofbirth");
                var s = {
                        FirstName: firstname,
                        LastName: lastname,
                        Remark: remark,
                        Place: placeofbirth,
                        Country: countryofbirth,
                        Gender: gender,
                        Birthdate: birthdate
                        }
                    res_data.push(s)
            });
            callback(null, {status:"AOK", data:res_data})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.getSubjectByID = function(ID, callback){
    var query = "MATCH (s:Subject) where ID(s)=$id return s.firstname, s.lastname, s.gender, s.birthdate, s.placeofbirth, s.countryofbirth, s.UUID, s.remark";
    var arg = {id: Number(ID)};
    neo4j.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            //TODO ONLY what is needed in the frontend

            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })   
}
module.exports.getSubjectBy = function([field, tearms], callback){
    var query = "MATCH (s:Subject) where s."+field+"=$id return id(s), s.firstname, s.lastname, s.gender, s.birthdate, s.placeofbirth, s.countryofbirth, s.UUID, s.remark";
    var arg = {id: tearms};
    if (!isNaN(tearms)){
        //is a number
        arg = {id: Number(tearms)};
    }
    neo4j.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err){
            //TODO ONLY what is needed in the frontend


            callback(null, {status:"AOK", data:res})
        }else{
            callback({status:"NOK", error:err});
        }
    })
};
module.exports.deleteSubjectByID = function(ID, callback){
    //preveri če obstajajo povezave na ID
    var query = "MATCH (c)-[]-(n) where ID(n)=$id return count(c)";
    var arg = {id: ID}
    neo4j.exacuteQueryWithArgs(query, arg, function(err, res){
        if(!err && Number(res.records[0]._fields)<1){
            //DELETE ID only if no conncetion exists
            query2="MATCH (n: Subject) WHERE ID(n) = $id DELETE n"
            neo4j.exacuteQueryWithArgs(query, arg, function(err, res){
                if(!err){
                    callback(null, {status:"AOK"})
                }else{
                    callback({status:"NOK", error:err});
                } 
            });
        }else{
            callback({status:"NOK", error:err});
        }
    })
};

module.exports.updateSubject = function(req, callback){
    var param =  req.params.subjectID
    var query = "MATCH (s:Subject) where ID(s)=$id OR s.UUID=$uuid return s.firstname, s.lastname, s.gender, s.birthdate, s.placeofbirth, s.countryofbirth, s.UUID s.remark";
    var args = {id: param,
                uuid: param};
    //console.log(ID, args)
    neo4j.exacuteQueryWithArgs(query, args, function(err, res){
        if(err){
            callback(err);
        }else{
            var FirstName = req.body.FirstName ? req.body.FirstName : res.records[0].get("s.firstname");
            var LastName = req.body.LastName ? req.body.LastName : res.records[0].get("s.lastname");
            var BirthDay = req.body.BirthDay ? req.body.BirthDay : res.records[0].get("s.birthdate");
            var Country = req.body.Country ? req.body.Country : res.records[0].get("s.countryofbirth");
            var Place = req.body.Place ? req.body.Place : res.records[0].get("s.placeofbirth");
            var Sex = req.body.Gender ? req.body.Gender:  res.records[0].get("s.gender");
            var Remark = req.body.Remark ? req.body.Remark : res.records[0].get("s.remark");
            param = res.records[0].get("s.UUID")
            query = "MATCH (s:Subject) where s.UUID=$id SET s.firstname=$firstname, s.lastname=$lastname, s.gender=$gender, s.birthdate=$birth_day, s.placeofbirth=$birth_place, s.countryofbirth=$birth_country, s.remark=$remark";
            args = {id: param,
                    firstname: FirstName,
                    lastname: LastName,
                    birth_day: BirthDay,
                    birth_place: Place,
                    birth_country: Country,
                    gender: Sex,
                    remark: Remark};
            //console.log(args);
            neo4j.exacuteQueryWithArgs(query,args, function(err, result){
                if(err){
                    callback(err);
                }else{
                    callback(null, {status: "AOK"});
                }
            });
        }
    });

};

//New SubjectMeasurment under the new name subject_parameters
module.exports.newSubjectMeasurment = function(req, callback){
    var id = Number(req.body.SubjectID)
    var DateTime = new Date().toISOString();
    var ResoultType = req.body.ResoultType;
    var BestPlacment = req.body.BestPlacment;
    var Discipline = req.body.Discipline;
    var Height = Number(req.body.Height);
    var Weight = Number(req.body.Weight);
    var Sport = req.body.Sport;
    var PlayPosition = req.body.PlayPosition;
    var Technique = req.body.Technique;

    if (!DateTime || !id || !Height || !Weight) {
        callback({status:"NOK", error:"id, height, weight are required."})
    }else{
        var query = "MATCH (a:Subject) WHERE id(a) = $id CREATE (a)-[:MEASURED {date: datetime($datetime)}]->"+
        "(n:SubjectMeasurment {date: datetime($datetime), height: $height, weight: $weight, sport: $sport , discipline: $discipline,"+ 
        "technique: $technique, playposition: $playposition, ResoultType: $resoulttype, bestplacment: $bestplacment})";
        var data = { id: id,
                    datetime: DateTime,
                    resoulttype: ResoultType,
                    bestplacment: BestPlacment,
                    discipline: Discipline,
                    height: Height,
                    weight: Weight,
                    sport: Sport,
                    playposition: PlayPosition,
                    technique:Technique};
        neo4j.exacuteQueryWithArgs(query,data, function(err, res){
            if(err){
                callback({status:"NOK", error:err});
            }else{
                callback(null, {status:"AOK", data: res})
            }
        })
    }
}
//Update SubjectMeasurment
module.exports.updateSubjectMeasurment = function(req, callback){
    var id_meas = req
    var DateTime = new Date();
    var ResoultType = req.body.ResoultType;
    var BestPlacment = req.body.BestPlacment;
    var Discipline = req.body.Discipline;
    var Height = Number(req.body.Height);
    var Weight = Number(req.body.Weight);
    var Sport = req.body.Sport;
    var PlayPosition = req.body.PlayPosition;
    var Technique = req.body.Technique;
    var query = "MATCH (a:SubjectMeasurment) WHERE id(a) = $id SET a.date: datetime($datetime), a.height: $height, a.weight: &weight, a.sport: $sport , a.discipline: $discipline,"+ 
    "a.technique: $technique, a.playposition: $playposition, a.ResoultType: $resoulttype, a.bestplacment: $bestplacment})";
    var data = { id: id_meas,
                datetime: DateTime,
                resoulttype: ResoultType,
                bestplacment: BestPlacment,
                discipline: Discipline,
                height: Height,
                weight: Weight,
                sport: Sport,
                playposition: PlayPosition,
                technique:Technique};
    neo4j.exacuteQueryWithArgs(query,data, function(err, res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            callback(null, {status:"AOK", data: res})
        }
    })
}
//get all subject measruments chronologicaly
module.exports.getAllSubjectMeasurmentBySubjectID = function(req, callback){
    var id = req;
    var query = "MATCH (s: SubjectMeasurment)<-[m:MEASURED]-(su:Subject) where id(su)=3 return su, m, s"
    neo4j.exacuteQuery(query, function(err,res){
        if(err){
            callback({status:"NOK", error:err});
        }else{
            //console.log(res.records[0]);
            var response =[];
            //TODO ONLY what is needed in the frontend
            res.records.forEach(record => {
                record.get("su").properties.birthdate = new Date(record.get("su").properties.birthdate).toISOString();
                record.get("m").properties.date = new Date(record.get("m").properties.date).toISOString();
                record.get("s").properties.date = new Date(record.get("s").properties.date).toISOString();
                let resp = {Subject: record.get("su").properties,
                            MEASURED: record.get("m").properties,
                            SubjectMeasurment: record.get("s").properties}
                //console.log(resp);
                response.push(resp);
            });
            callback(null, {status:"AOK", data: response})
        }
    })
}