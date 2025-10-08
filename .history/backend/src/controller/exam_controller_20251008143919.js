
const  getAllExam = async (req, res) => { 

try{
    const [rows] = await db.query("SELECT * FROM exam_categories");
    res.status(200).json(rows);
} catch (error) {
    res.status(500).json({ message: error.message });
}


}