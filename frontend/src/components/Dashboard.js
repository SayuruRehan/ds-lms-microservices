import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import AdminImg from "../assets/admin-img.jpg";
import InstructorImg from "../assets/instructor-img.jpg";
import StudentImg from "../assets/student-img.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex ml-5 mr-5 mt-10 mb-20 justify-center items-center">
      <Card className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img src={AdminImg} alt="card-image" />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-center"
          >
            ADMIN POTRAL
          </Typography>
          <Typography className="text-center">
            This is the Admin portal which have all the end point access.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 text-center">
          <Button onClick={() => navigate("/adminList")}>Enter</Button>
        </CardFooter>
      </Card>
      <Card className="mt-6 w-96 ml-5">
        <CardHeader color="blue-gray" className="relative h-56">
          <img src={InstructorImg} alt="card-image" />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-center"
          >
            INSTRUCTOR POTRAL
          </Typography>
          <Typography className="text-center">
            This is the Instructor portal Instructors can publish course in
            there.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 text-center">
          <Button onClick={() => navigate("/list")}>Enter</Button>
        </CardFooter>
      </Card>
      <Card className="mt-6 w-96 ml-5">
        <CardHeader color="blue-gray" className="relative h-56">
          <img src={StudentImg} alt="card-image" />
        </CardHeader>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-center"
          >
            STUDENT POTRAL
          </Typography>
          <Typography className="text-center">
            This is the Student portral, The public entry. All the users can
            entroll courses from here.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 text-center">
          <Button onClick={() => navigate("/")}>Enter</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
