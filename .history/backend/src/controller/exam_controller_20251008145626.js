
const  getAllExam = async (req, res) => { 

try{
     
    const allData = await exa.checkUserByPhone(phone_no);

    res.status(200).json(rows);
} catch (error) {
    res.status(500).json({ message: error.message });
}


}