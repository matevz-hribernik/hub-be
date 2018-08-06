var sql = require('../../modelDB/sqlDo.js');
var replicationMetadata = require('../../modelDB/replicationMetadata')

module.exports = function(app) {
    //   REPLICATION METADATA
    /**
     * @api {post} /replication-metadata Create a new replication
     * @apiGroup replication-metadata
     * @apiParam {String} ReplicationID replication's replicationID
     * @apiParam {String} MetaData replication's MetaData
     */
    app.post("/replication-metadata", function(req, res){
        console.log(req.body)
        replicationMetadata.postReplicationMetadata(req, function(err, result, code){
            if(err){
                res.status(code || 500).json({error:err});
            }else{
                res.json(result);
            }
        })
    });
    /**
     * @api {get} /replication-metadata/:replicationID by ID
     * @apiGroup replication-metadata
     */
    app.get("/replication-metadata/:replicationMetaDataID", function(req,res){
        var ID = req.params.replicationID;
        replicationMetadata.getOneReplicationMetadata(ID, function(err, result, code){
            if(err){
                res.status(code || 500).json({error:err});
            }else{
                res.json(result);
            }
        })

    });
    /**
     * @api {get} /replication-metadata
     * @apiGroup replication-metadata
     */
    app.get("/replication-metadata", function(req,res){
        replicationMetadata.getAllReplicationMeatadata(req.query, function(err, result, code){
            if(err){
                res.status(code || 500).json({error:err});
            }else{
                res.json(result);
            }
        })

    });

    /**
     * @api {delete} /replication-metadata/:replicationMetaDataID Delete an replication by ID
     * @apiGroup replication-metadata
     */
    app.delete("/replication-metadata/:replicationID", function(req,res){

        var ID = req.params.replicationID;
        replicationMetadata.deleteReplicationMetadataByID(ID, function(err, result, code){
            if(err){
                res.status(code || 500).json({error:err});
            }else{
                res.json(result);
            }
        })
    });

      /**
     * @api {put} /replication-metadata/:replicationID Update an replication
     * @apiGroup replication-metadata
     * @apiParam {String} ReplicationID replication's replicationID
     * @apiParam {String} MetaData replication's MetaData
     */
    app.put("/replication-metadata/:replicationID", function(req,res){
        replicationMetadata.updateReplicationMetadata(req, function(err, result, code){
            if(err){
                res.status(code || 500).json({error:err});
            }else{
                res.json(result);
            }
        })
    });
};
