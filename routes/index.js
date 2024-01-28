var express = require('express');
var router = express.Router();
// 1 tạo csdl mongodb
// mở kết nối , truy vấn vào bảng trên csdl
// trả về dữ liệu dạng JSON
// tập viết API cho ứng dụng mobile
/* GET home page. */

// const urlDB = "mongodb+srv://admin:r2xfY0vvdlFeolYr@cluster0.jkglkic.mongodb.net/?retryWrites=true&w=majority"
const urlDB ="mongodb+srv://Trongph23292:trong2003@and103.sbetpz5.mongodb.net/?retryWrites=true&w=majority"
// mở kết nối bằng thư viện mongosse
var mongoose = require('mongoose') // click chữ mongoosee , bấm Alt + Enter để cài thư viện vào project

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect(urlDB, {});
// Lấy kết nối
const db = mongoose.connection;


// Xử lý lỗi kết nối
db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB'));

// Xác nhận kết nối thành công
db.once('open', function () {
    console.log('Kết nối thành công');
});

// định nghĩa đối tượng - collection - document
// định nghĩa cấu trúc của document
// Schema !!! định nghĩa các cặp giá trị thể thiện thông tin
// key : value
// tạo 1 Schema Student :
var car
    = new mongoose.Schema({
    id:String,
    name: String,
    brand: String,
    price: String,

});
// Liên kết Schema với DB
const Car = mongoose.model('car', car);

router.get('/showInsertCarForm',
    function (req, res) {
        res.render('insert')
})

router.post('/insertCar',function (req,res) {
  // lay du lieu tu form
  // // ket noi vao database , tao Sinh vien
  //   <input name="name" placeholder="Nhập tên sinh viên ..."/>
  //   <input name="hoten" placeholder="Nhâp họ sinh viên...">
  //       <input name="number" placeholder="Nhâp sdt sinh viên...">
  //           <input name="address" placeholder="Nhâp địa chỉ sinh viên...">
    var id = req.body.id
    var name = req.body.name
    var brand= req.body.brand
    var price = req.body.price

    var cars = new Car({
        id:id,
        name : name,
        brand : brand,
        price : price,
    })

    cars.save().then(()=>{
        res.send('Them thanh cong!!!')
    }).catch(error =>{
        res.send('Them that bai ' + error.message)
    })

})


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/getListCarAPI',function (req,res) {
    var students = Car.find({}).then((data)=>{
        res.json(data);
    }).catch(error => {
        res.json('Co loi xay ra')
    })
})

router.get('/showListCar',function (req,res) {
   Car.find({}).then((data)=>{
        res.render('liststudent',{value : data});
    }).catch(error => {
        res.send('Co loi xay ra')
    })
})

module.exports = router;
