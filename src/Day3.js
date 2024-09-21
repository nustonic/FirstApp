import { useState } from "react";
import Swal from "sweetalert2";

const From = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        message: "",
    });
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value, }));
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (formData.name == "" || formData.email == "" || formData.gender == "" || formData.dateOfBirth == "" || formData.message == "") {
            return Swal.fire({
                title: "Warning",
                text: "please input all fill",
                icon: 'warning',
                confirmButtonText: 'OK'
            });

        }



        //ask customer to confirm send
        const isSubmit = await Swal.fire({
            title: "Are you sure want to send?",
            text: "We'll send your message to your wife",
            icon: 'question',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            showCancelButton: true
        });
        if (!isSubmit.isConfirmed) {
            return;
        }
        onSubmit(formData);
        setFormData({
            name: "",
            email: "",
            dateOfBirth: "",
            gender: "",
            message: "",
        });
        Swal.fire({
            title: "Successful",
            text: "you are input succesed",
            icon: 'success',
            confirmButtonText: 'OK'
        })
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p><h1>Good morning Day 3</h1></p>
            <p><h2>Comment Form</h2></p>

            <input onChange={handleChange} value={formData.name} type="text" name="name" placeholder="Name" ></input>
            <input value={formData.email} onChange={handleChange} type="email" name="email" placeholder="email" ></input>
            <input value={formData.dateOfBirth} onChange={handleChange} type="date" name="dateOfBirth" placeholder="Dateofbirth" ></input>
            <select value={formData.gender} onChange={handleChange} name="gender" >
                <option value="">gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <textarea value={formData.message} onChange={handleChange} name="message" placeholder="Your Message" ></textarea>
            <br></br><button type="submit" >Send</button>

        </form>
    )
}
const Day3 = () => {

    const [submissions, setSubmissions] = useState([]);
    const handleSubmit = (formData) => {
        setSubmissions([...submissions, formData]);
    }

    return (
        <div className="container">

            <From onSubmit={handleSubmit}></From>
            <div className="submission">
                <h3>Data Recieved</h3>
                {submissions.map((ss, index) => (
                    <div className="submission-item">
                        <p>
                            <center><strong>Name:</strong> {ss.name}</center>
                        </p>
                        <p>
                            <strong>Email:</strong> {ss.email}
                        </p>
                        <p>
                            <strong>Date of Birth:</strong> {ss.dateOfBirth}</p>
                        <p>
                            <strong>Gender:</strong> {ss.gender}</p>
                        <p>
                            <strong>Message:</strong> {ss.message}</p>
                    </div>
                ))}
            </div>
            <style jsx>
                {`
                .submission-item strong{
                color: #387CAD;
                
                }
                .submission{
                    width:100%;
                    max-width: 600px;
                    margin-top:20px;
                    text-align:left;
                }
                .submission-item{
                    //background-color:#c7c6b7;
                    border-raduis: 20px;
                    padding: 15px;
                    margin-bottom:15px;
                    box-shadow: 0 0 5px rgba(0,0,0,0.5);
                    background-image: url("https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg");
             
                }
                .container{
                min-height: 100vh;
                background-color: #0f0f0f0;
                padding: 20px;
                max-width:600px;
                text-align: center;
                margin:0 auto;
                display:flex;
                flex-direction:column;
                align-item:left;


                }
            h2{
            color:white;}
            .form{
                display: flex;
                // width:300px;
                flex-direction: column;
                padding: 20px;
             background-color: #387CAD;
                border-raduis:8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }
                .form input, .form textarea, .form select {
                margin: 3px 0;
                padding: 4px;
                border-raduis:10px;
                border: 1px solid yellow;
                font-size: 16px;
                }
                .form textarea{
                min-height:100px;
                resize:vertical;
                margin:10px;
                }
                .form button {
                background-color: orange;

                }
                `}

            </style>
        </div>
    );
}
export default Day3;
