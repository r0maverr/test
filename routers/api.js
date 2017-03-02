var express = require('express');
var router = express.Router();

var departments = require('../models/departments');

function response(code,data) {
    if(code == 200) {
        var res = {status: 200, message: "OK"};
        if(data != undefined) res.data = data;
        return res;
    }
    else if(code == 400)
        return {status: 400, message: "Bad request"};
    else if(code == 500)
        return {status: 500, message: "Internal server error"};
}

// CREATE
// /api/departments?name=""&description=""
router.put('/departments', function(req,res,next){
    departments.create({
        name: req.query.name,
        description: req.query.description
    })
        .then(function(data){
            res.send(response(200,data));
        })
        .catch(function(err){
            if(err.message.includes("Validation error"))
                res.send(response(400));
            else
                res.send(response(500));
        });
});

// READ
// /api/departments?id="" || /api/departments?id=""
router.get('/departments', function(req,res,next){
    if(req.query.id != undefined && !isFinite(req.query.id) && req.query.id.includes('.')){
        res.send(response(400));
        return;
    }

    departments.findAll(req.query.id == undefined ? {} : { id: req.query.id })
        .then(function(data){
            console.log('send response from router GET /api/departments');
            res.send(response(200,data));
        })
        .catch(function(err){
            if(err.message.includes("Validation error"))
                res.send(response(400));
            else
                res.send(response(500));
        });
});

//UPDATE
// /api/departments?id=""&name=""&description=""
router.post('/departments',function(req,res,next){
    if(req.query.name == undefined || req.query.description == undefined){
        res.send(response(400));
        return;
    }

    var values = {};
    if(req.query.name != undefined) values.name = req.query.name;
    if(req.query.description != undefined) values.description = req.query.description;

    departments.update(values, { where: { id: req.query.id } })
        .then(function(data){
            if (data > 0)
                res.send(response(200));
            else
                res.send(response(400));
        })
        .catch(function(err){
                if(err.message.includes("Validation error"))
                    res.send(response(400));
                else
                    res.send(response(500));
            }
        );
});

//DELETE
// /api/departments?id=""
router.delete('/departments', function(req,res,next){
    if(!isFinite(req.query.id) && req.query.id.includes('.')){
        res.send(response(400));
        return;
    }

    departments.destroy({
        where: {
            id: req.query.id
        }
    })
        .then(function(data){
            if(data > 0)
                res.send(response(200));
            else
                res.send(response(400));
        })
        .catch(function(err){
                res.send(response(500));
            }
        );
});

var employee = require('../models/employee');

// CREATE
// /api/employee?firstName=""&lastName=""&departmentId=""
router.put('/employee', function(req,res,next){
    if(!isFinite(req.query.departmentId)){
        res.send(response(400));
        return;
    }

    // departments.findAndCountAll({ where: { id: req.query.departmentId } })
    //     .then(function(data){
    //         if(data.count == 0){
    //             res.send(response(400));
    //             return;
    //         }

            employee.create({
                firstName: req.query.firstName,
                lastName: req.query.lastName,
                departmentId: req.query.departmentId
            })
                .then(function(data){
                    res.send(response(200,data));
                })
                .catch(function(err){
                    console.log(err);
                    if(err.message.includes("Validation error"))
                        res.send(response(400));
                    else
                        res.send(response(500));
                });
        // })
        // .catch(function(err){
        //     res.send(response(500));
        //     return;
        // });


});

// READ
// /api/employee?id="" || /api/employee
router.get('/employee', function(req,res,next){
    if(req.query.id != undefined && !isFinite(req.query.id) && req.query.id.includes('.')){
        res.send(response(400));
        return;
    }

    employee.findAll(req.query.id == undefined ? {} : { id: req.query.id })
        .then(function(data){
            res.send(response(200,data));
        })
        .catch(function(err){
            if(err.message.includes("Validation error"))
                res.send(response(400));
            else
                res.send(response(500));
        });
});

//UPDATE
// /api/employee?id=""&firstName=""&lastName=""&departmentId=""
router.post('/employee',function(req,res,next){
    if((!isFinite(req.query.id) && req.query.id.includes('.'))
        ||
        (req.query.firstName == undefined && req.query.lastName == undefined && req.query.departmentId == undefined)) {
        res.send(response(400));
        return;
    }

    var values = {};
    if(req.query.firstName != undefined) values.firstName = req.query.firstName;
    if(req.query.lastName != undefined) values.lastName = req.query.lastName;
    if(req.query.departmentId != undefined) values.departmentId =  req.query.departmentId;

    employee.update(values, { where: { id: req.query.id } })
        .then(function(data) {
            if (data > 0)
                res.send(response(200));
            else
                res.send(response(400));
        })
        .catch(function(err){
                if(err.message.includes("Validation error"))
                    res.send(response(400));
                else
                    res.send(response(500));
            }
        );
});

//DELETE
// /api/employee?id=""
router.delete('/employee', function(req,res,next){
    if(!isFinite(req.query.id) && req.query.id.includes('.')){
        res.send(response(400));
        return;
    }

    employee.destroy({
        where: {
            id: req.query.id
        }
    })
        .then(function(data){
            if(data > 0)
                res.send(response(200));
            else
                res.send(response(400));
        })
        .catch(function(err){
                res.send(response(500));
            }
        );
});

module.exports = router;