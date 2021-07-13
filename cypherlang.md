CREATE (n:Person { name: 'Andy', title: 'Developer' })


CREATE (a { name: 'Andy' })
RETURN a.name

relationship create
MATCH (a:Person),(b:Person)
WHERE a.name = 'A' AND b.name = 'B'
CREATE (a)-[r:RELTYPE]->(b)
RETURN type(r)

create relationship with propertis
MATCH (a:Person),(b:Person)
WHERE a.name = 'A' AND b.name = 'B'
CREATE (a)-[r:RELTYPE { name: a.name + '<->' + b.name }]->(b)
RETURN type(r), r.name


# Primitivni tipi brez povezave na ostale

CREATE:   CREATE (n:Activity { name: 'Shooting', description: 'Pistol shooting' })
UPDATE:   MATCH (n: Activity { name: 'Shooting' }) SET n.description ="Pistol shooting" RETURN n
          MATCH (n: Activity) WHERE ID(n) = 0 SET n.description ="Pistol shooting2" RETURN n
Preverjanje povezava:     MATCH (c)-[]->(n) where ID(n)=0 return count(c)  MATCH (n)-[]->(c) where ID(n)=3 RETURN count(c)
Če povezave ni lahko delete  MATCH (n: Activity) WHERE ID(n) = 0 DELETE n

CREATE (n:SensorType { name: 'acc', description: 'Accelerometer', DOF: 3, Unit: 'G' })
MATCH (n:SensorType {name:'acc'}) SET n.description="acceleromenter", n.DOF=4, n.Unit ='m/s^2' RETURN n


CREATE (n:DeviceType { name: 'phone', description: 'Iphone', sensorcount: 3 })
MATCH (n:DeviceType {name:'phone'}) SET n.description ='test phone', n.sensorcount = 1 RETURN n



CREATE (n:Subject { firstname: 'Matevž', lastname:'Hribernik', birthdate: date('1995-02-02'), placeofbirth: 'Celje', countryofbirth: 'Slovenia',
gender: 'Male', UUID:''????, remark:'developer' })
MATCH (n: Subject {firstname:'Matevž', lastname:'Hribernik'}) SET n.birthdate=date('1995-02-01'), n.placeofbirth='Ljubljana', n.countryofbirth ="Slov", n.gender="Male", n.UUID='mzj8695658utv25m', n.remark='coder' RETURN n


MATCH (a:Subject) WHERE a.firstname = 'Matevž'
CREATE (a)-[:MEASURED {date: date(time)?????('2020-11-23')}]->(n:SubjectMeasurment { date: date(time)??????('2020-11-19'), height: 185, weight: 130, sport: 'eatting', discipline: 'gurmane', technique: 'hands', playposition: '', ResoultType:'PB', bestplacment:'local'})


MATCH (a:Activity) WHERE a.name='Shooting'
CREATE (e:Experiment {name: 'Precise Shooting', customfields: ['Pistol','Lenght','Number Of shoots']})-[:TYPE_OF]->(a)
MATCH (e:Experiment) where e.name="Precise Shooting" SET e.customfields = [] return e 

MATCH (d:DeviceType) WHERE d.name='phone'
CREATE (D: Device {name: "Matevz's phone", sampletime: 10})-[:TYPE_OF]->(d)

MATCH (s:SensorType) WHERE s.name = 'acc' 
CREATE (S:Sensor {range: 1000, bitdepth: 10})-[:TYPE_OF]->(s)

MATCH (s:Sensor), (d:Device)
WHERE s.range = 1000 AND d.name="Matevz's phone"
CREATE (s)-[:INCLUDED_IN {bodylocation:"back"}]->(d)

MATCH (d:Device),(e:Experiment)
WHERE e.name = 'Precise Shotting' AND d.name="Matevz's phone"
CREATE (d)-[:USED_ID {bodylocation:"lowerback"}]->(e)

MATCH (e:Experiment), (s:Subject), (sm:SubjectMeasurment)
Where e.name = 'Precise Shotting' AND s.firstname = 'Matevž', sm.date=date("2020-11-19")
CREATE (m:Measurment {date: date('2020-11-23'), latitude: 39.44534242, longitude: 15.45343534, location: 'Tržaška 25', Pistol: 'Glock', NumberOfshots: 5})-[:IS_USING]->(e)
CREATE (m)-[:TESTING]->(s) 
CREATE (m)-[:SUBJECT_CONDITION]->(sm)
če je treba anonimizirati je subject anonimus, pa so vedno novi subjectmeasurmenti time and date.

MATCH (s:Sensor), (d:Device), (m:Measurment)
WHERE s.range=1000 AND d.name="Matevz's phone" AND m.date=date(now())
CREATE (ss:SensorSignal {DB_ID:001})-[:DATA_OF]->(s)
CREATE (ss)-[:DATA_OF]->(d)
CREATE (ss)-[:DATA_OF]->(m)






