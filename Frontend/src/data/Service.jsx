import { faBedPulse, faMicroscope, faPills, faStethoscope, faTruckMedical, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const services=[
    {
        id: 1,
        icon:<FontAwesomeIcon icon={faUserDoctor} />,
        sName: "Emergency Care",
        sDesc:
          "Immediate medical attention for urgent health issues, available 24/7, ensuring prompt diagnosis and treatment of critical conditions.",
      },
      {
        id: 2,
        sName: "Operations & Surgery",
        icon:<FontAwesomeIcon icon={faBedPulse} />,
        sDesc:
          "Comprehensive surgical services, from minor procedures to major surgeries, performed by skilled surgeons using advanced technology.",
      },
      {
        id: 3,
        sName: "Outdoor Checkup",
        icon:<FontAwesomeIcon icon={faStethoscope} />,
        sDesc:
          "Routine medical consultations for diagnosing and managing non-emergency health concerns, ensuring continuous care and preventive health measures.",
      },
      {
        id: 4,
        sName: "Ambulance Service",
        icon:<FontAwesomeIcon icon={faTruckMedical} />,
        sDesc:
          " Rapid transport service equipped with life-saving equipment and trained personnel, available for emergencies and patient transfers. ",
      },
      {
        id: 5,
        icon:<FontAwesomeIcon icon={faPills} />,
        sName: "Medicine & Pharmacy",
        sDesc:
          "A full-service pharmacy providing prescription medications, over-the-counter drugs, and expert advice for safe and effective treatment.",
      },
      {
        id: 6,
        icon:<FontAwesomeIcon icon={faMicroscope} />,
        sName: "Blood Testing",
        sDesc:
          "Accurate laboratory tests to assess health conditions, including blood count, cholesterol levels, and disease markers, with fast results for diagnosis.",
      }
]

export default services;