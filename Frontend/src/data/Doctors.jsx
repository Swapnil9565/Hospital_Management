import team1 from "../Assets/team-1.jpg"
import team2 from "../Assets/team-2.jpg"
import team3 from "../Assets/team-3.jpg"
import team4 from "../Assets/team-4.jpg"
import team5 from "../Assets/team-5.jpeg"


const doctors=[
    {
        id:1,
        docImg:<img src={team1} alt="team1"/>,
        docName:"Dr. John Smith",
        docDept:"Dermatologist",
        docSpecialization:"Specialized in the treatment of skin, hair, and nail conditions."
    },
    {
        id:2,
        docImg:<img src={team2} alt="team1"/>,
        docName:"Dr. Michael Davis",
        docDept:"Gynacologist",
        docSpecialization:"Specialized in diagnosis and treatment related to  women's reproductive health."
    },
    {
        id:3,
        docImg:<img src={team3} alt="team1"/>,
        docName:"Dr. Emily Johson",
        docDept:"Neurologist",
        docSpecialization:"Specialized in diagnosing and treating disorders of the nervous system."
    },
    {
        id:4,
        docImg:<img src={team4} alt="team1"/>,
        docName:"Dr.Anuradha Malhotra",
        docDept:"Gynacologist",
        docSpecialization:"Specialized in the health of the female reproductive system."
    },
    {
        id:5,
        docImg:<img src={team5} alt="team1"/>,
        docName:"Dr.Adwin Max ",
        docDept:"Othopedic Surgeon",
        docSpecialization:"Specialized in diagnosising and treating disorders related to the musculoskeletal system."
    }

]

export default doctors;