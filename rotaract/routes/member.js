const fs = require('fs');
const path = require('path')
const { get_error_log } = require('../error_log/error_log');
const error_log_path = "./error_log/member_api_error.txt"

module.exports = {
    getMembers: (req, res) => {
        const club_id = req.body.club_id
        let query = "SELECT * FROM `members` where club_id=?";
        db.query(query, club_id, (err, members) => {
            if (err) {
                console.log(err)
                get_error_log(error_log_path, err+" getMembers()")
                return res.status(500).send(err);
            }
            return res.json({ data: members });
        })
    },
    getMemberData: (req, res) => {
        const memberId = req.body.memberId
        let query = "SELECT * FROM `members` where id=?";
        db.query(query, memberId, (err, member) => {
            if (err) {
                console.log(err)
                get_error_log(error_log_path, err+" getMembers()")
                return res.status(500).send(err);
            }
            let query2 = "SELECT d.* FROM `members` a INNER JOIN (SELECT b.* FROM `member_type_link` b INNER JOIN `member_type` c ON b.`member_type_id`=c.`id`) d ON a.`id`=d.`member_id` where a.`id`=?";
            db.query(query2, memberId, (err, memberTypes) => {
                if (err) {
                    get_error_log(error_log_path, err+" getMembers()")
                    return res.status(500).send(err);
                }
                return res.json({ data: member, types: memberTypes });
            })
        })
    },
    getMembersByName: (req, res) => {
        const name = req.body.name
        const club_id = req.body.club_id
        let query = "SELECT * FROM `members` where first_name LIKE ? AND club_id = ?";
        db.query(query, ['%' + name + '%', club_id], (err, member) => {
            if (err) {
                get_error_log(error_log_path, err+" getMembers()")
                return res.status(500).send(err);
            }
            return res.json({ data: member });
        })
    },
    editMemberData: (req, res) => {
        const data = req.body.body
        const member = data.member
        const joined_date = new Date(member.joined_date)
        const types = data.types
        const fileName = data.fileName
        let imagePath = './img/tmp_images'
        let desPath = './img/club-member-img'
        let typeList = []

        types.forEach(type => {
            let type_tmp = Object.values(type)
            type_tmp[2] = new Date(type_tmp[2])
            type_tmp[3] = new Date(type_tmp[3])
            typeList.push(type_tmp)            
        })
        fs.readdir(imagePath, function (err, files) {
            if (fileName.length > 0) {
                files.forEach(function (file, index) {
                    if (fileName === file) {
                        fs.rename(path.join(imagePath, file), path.join(desPath, file), err => {
                            if (err) {
                                get_error_log(error_log_path, err+" editMemberData()")
                                return res.status(500).send(err);
                            }
                            db.query('INSERT INTO images SET ?', { path: path.join(desPath, file) }, function (err, result) {
                                if (err) {
                                    get_error_log(error_log_path, err+" editMemberData()")
                                    return res.status(500).send(err);
                                }
                                let query = "UPDATE `members` SET member_id=?,first_name=?,last_name=?,register_num=?,joined_date=?,image_id=? WHERE id=?";
                                db.query(query, [member.member_id, member.first_name, member.last_name, member.register_num, joined_date.getFullYear() + "-" + (joined_date.getMonth() + 1) + "-" + joined_date.getDate(), result.insertId, member.id], (err, response) => {
                                    if (err) {
                                        get_error_log(error_log_path, err+" editMemberData()")
                                        return res.status(500).send(err);
                                    }
                                    db.query('DELETE FROM member_type_link WHERE member_id=?', [member.id], function (err, result) {
                                        let query = "INSERT INTO `member_type_link`(member_id,member_type_id,started_date,end_date) VALUES ?"
                                        db.query(query, [typeList], (err, response) => {
                                            if (err) {
                                                get_error_log(error_log_path, err+" editMemberData()")
                                                return res.status(500).send(err);
                                            }
                                            return res.send(200);
                                        })
                                    })
                                })
                            });
                        })
                    }
                })
            } else {
                let query = "UPDATE `members` SET member_id=?,first_name=?,last_name=?,register_num=?,joined_date=? WHERE id=?";
                db.query(query, [member.member_id, member.first_name, member.last_name, member.register_num, joined_date.getFullYear() + "-" + (joined_date.getMonth() + 1) + "-" + joined_date.getDate(), member.id], (err, response) => {
                    if (err) {
                        get_error_log(error_log_path, err+" editMemberData()")
                        return res.status(500).send(err);
                    }
                    db.query('DELETE FROM member_type_link WHERE member_id=?', [member.id], function (err, result) {
                        let query = "INSERT INTO `member_type_link`(member_id,member_type_id,started_date,end_date) VALUES ?"
                        db.query(query, [typeList], (err, response) => {
                            if (err) {
                                get_error_log(error_log_path, err+" editMemberData()")
                                return res.status(500).send(err);
                            }
                            return res.send(200);
                        })
                    })
                })
            }
        })
    },
    getBoardMembers: (req, res) => {
        const club_id = req.body.club_id
        let query = "SELECT * FROM `members` a INNER JOIN `member_type_link` b ON a.`id`=b.`member_id` where a.`club_id`=? AND b.`member_type_id`<7 AND b.`end_date` > ? ORDER BY b.`member_type_id` ASC";
        db.query(query, [club_id,new Date], (err, boardMembers) => {
            if (err) {
                get_error_log(error_log_path, err+" getBoardMembers()")
                return res.status(500).send(err);
            }
            return res.json({ data: boardMembers });
        })
    }
}