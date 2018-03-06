/**
 * Created by EkaterinaAcc on 22-Nov-15.
 */
exports.sqlSettings = {

    host     : '212.235.190.198',
    user     : 'sensors',
    password : 'j5sx4Mu4awTcuGnZ',
    database : 'sensors1'

};
exports.messages = {
    reg_failed_wrong_email_format: "Wrong email format",
    user_already_exists: "User already exists",
    reg_success:"Registration was successful",
    user_does_not_exist:"User does not exist!",
    login_was_successful:"Login was successful",
    wrong_pwd:"Wrong password",
    error:"Error occurred!",
    wrong_email_format:"Wrong email format",
    delete_was_successful:"Account was successfully deleted",
    change_was_succ:"Password was successfully changed",
    empty_fields: "Empty fields"
};
exports.tableNames = {
    user:"user",
    userLogin:"userlogin",
    measurement:"measurement",
    experiment:"experiment",
    experimentDevice:"experimentdevice",
    device:"device",
    sifDeviceType:"sifdevicetype",
    replicationSensor:"replicationsensor",
    replication:"replication",
    deviceSensor:"devicesensor",
    sensor:"sensor",
    sifSensorType:"sifsensorType",
    sensorData:"sensordata",
    replicationMetadata:'replicationmetadata',
    subject:'subject'
};
exports.port = 8484;
