const fs = require('fs');
const path = require('path')

module.exports = {
    getMembers: (req, res, club_id) => {
        let query = "SELECT * FROM `members`";
        db.query(query, (err, members) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.json({ data: members });
        })
    },
    editClubInfo: (req, res, club_id) => {
        const data = req.body
        const clubId = data.body.club_id
        const charterDate = new Date(data.body.charterDate)
        const clubName = data.body.clubName
        const clubIntroduction = data.body.clubIntroduction
        const fileNames = data.body.fileNames
        let imagePath = './img/tmp_images'
        let desPath = './img/club-info-img'
        fs.readdir(imagePath, function (err, files) {
            if(fileNames.length > 0) {
                files.forEach(function (file, index) {
                    if (fileNames.includes(file)) {
                        fs.rename(path.join(imagePath, file), path.join(desPath, file), err => {
                            if (err) throw err;
                            db.query('INSERT INTO images SET ?', { path: path.join(desPath, file) }, function (err, result) {
                                if (err) throw err;
                                let query = "UPDATE `club` SET name=?,introduction=?,charterDate=?,club_page_img_id=? WHERE id=?";
                                db.query(query, [clubName,clubIntroduction, charterDate.getFullYear()+"-"+(charterDate.getMonth()+1)+"-"+charterDate.getDate(), result.insertId, clubId], (err, response) => {
                                    if (err) {
                                        console.log(err)
                                        return res.status(500).send(err);
                                    }
                                    return res.status(200).json('Updated Introduction');
                                })
                            });
                        });
                    }
                })
            }
            else {
                let query = "UPDATE `club` SET name=?,introduction=?,charterDate=? WHERE id=?";
                db.query(query, [clubName,clubIntroduction, charterDate, clubId], (err, response) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                    return res.status(200).json('Updated Introduction');
                })
            }
                

            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
        })
    }
}