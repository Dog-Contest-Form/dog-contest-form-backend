var router = require('express').Router();
var DogContestForm = require('../../model/dogContestForm');
var mail = require('../../../mailConfig');
require("dotenv").config()

function createAttachment(array) {
    let attachmentArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].data) {
            attachmentArray.push({
                filename: `${array[i].fileName}.${(array[i].data.split("image/")[1]).split(";base64,")[0]}`,
                content: array[i].data.split("base64,")[1],
                encoding: 'base64'
            },);
        }
    }
    return attachmentArray;
}

module.exports = () => {
    router.post("/submit", async (req, res) => {
        const body = req.body;

        try {
            const data = await DogContestForm.find({});
            await DogContestForm.create({ _id: data.length, ...body }).then(() => {
                mail.sendMail({
                    from: process.env.GMAIL_USERNAME,
                    to: body.ownerEmail,
                    subject: 'ลงทะเบียนประกวด Dog Super Model สำเร็จ',
                    html: `
                    <h1>ขอบคุณที่เข้าร่วมประกวด Dog Super Model 🐕</h1>
                    <p>ขอบคุณที่ให้ความสนใจ</p>
                    <hr />
                    <div>
                        <p><b>ตอนที่ 1</b></p>
                        <p><u>ข้อมูลส่วนของเจ้าของสัตว์เลี้ยง</u></p>
                        <p><b>ชื่อ - นามสกุล</b>: ${body.ownerName}</p>
                        <p><b>ที่อยู่</b>: ${body.ownerAddress}</p>
                        <p><b>เบอร์โทรศัพท์</b>: ${body.ownerPhoneNumber}</p>
                        <p><b>อีเมล</b>: ${body.ownerEmail}</p>
                        <p><u>ข้อมูลส่วนของสัตว์เลี้ยง</u></p>
                        <p><b>ชื่อสัตว์เลี้ยง</b>: ${body.dogName}</p>
                        <p><b>สายพันธุ์</b>: ${body.dogBreed}</p>
                        <p><b>เพศ</b>: ${body.dogSex}</p>
                        <p><b>อายุ (ปี)</b>: ${body.dogAge}</p>
                        <p><b>น้ำหนัก (กิโลกรัม)</b>: ${body.dogWeight}</p>
                    </div>
                    <hr />
                    <div>
                        <p><b>ตอนที่ 2</b></p>
                        <p><u>ข้อมูลการประกวด</u></p>
                        <p><b>เกณฑ์การประกวด</b>: ${body.contestCriteria}</p>
                        <p><b>ประเภทการประกวด</b>: ${body.contestType}</p>
                        <p><b>รุ่นที่สมัคร</b>: ${body.contestClass}</p>
                        <p><b>ความสามารถพิเศษของสัตว์เลี้ยง</b>: ${body.dogTalent}</p>
                    </div>
                    <hr />
                    <div>
                        <p><b>ตอนที่ 3</b></p>
                        <p><u>ข้อมูลการชำระเงิน</u></p>
                        <p><b>ข้อตกลง</b>: ข้าพเจ้ายอมรับข้อปฏิบัติและมาตรการที่ผู้จัดงานได้กำหนดขึ้น</p>
                    </div>
                    `, attachments: createAttachment([
                        { fileName: "dog_image", data: body.dogImage },
                        { fileName: "transfer_slip", data: body.transferSlip },
                    ])
                })
                res.sendStatus(200);
            }, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Send Email Success");
                }
            });
        } catch (error) {
            res.sendStatus(500);
            console.log(error);
        }
    });

    return router;
}