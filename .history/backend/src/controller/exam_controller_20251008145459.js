
const  getAllExam = async (req, res) => { 

try{
     

    res.status(200).json(rows);
} catch (error) {
    res.status(500).json({ message: error.message });
}


}