import { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "./../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "./../features/authentication/UpdatePasswordForm";
import { useUser } from "../features/authentication/useUser";
import AddPatientForm from "./AddPatientForm"; // Import the AddPatientForm component
import { css } from "styled-components";
// import { is } from 'date-fns/locale';

export async function getCurrentUserData(id) {
  try {
    const response = await fetch(`http://localhost:5023/api/v1/User/${id}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });
    console.log("user data res", response);
    const user = await response.json();
    console.log("user data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

export async function getCurrentStaffData(id) {
  try {
    const response = await fetch(`http://localhost:5023/api/v1/Staff/${id}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });
    console.log("user data res", response);
    const user = await response.json();
    console.log("user data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const StyledThead = styled.thead`
  background-color: var(--color-grey-50);
`;

const StyledTh = styled.th`
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledTr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledTd = styled.td`
  padding: 1.2rem 2.4rem;
`;

const StyledTbody = styled.tbody`
  margin: 0.4rem 0;
`;

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    background-color: #d8d4d4;
    color: #0e0e5f;
    width: auto;
    margin: 2px;
    &:hover {
      background-color: var(--color-brand-900);
      color: var(--color-indigo-700);
    }
  `,

  secondary: css`
    color: var(--color-grey-100);
    background: var(--color-brand-900);
    border: 1px solid var(--color-grey-200);

    &:hover {
      color: var(--color-brand-900);
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  max-width: 350px;
  background-color: #d8d4d4;
  color: #0e0e5f;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

function Account() {
  const { user } = useUser();
  let userRole = user.role;
  // Check if the user is an admin or super admin
  let isAdmin = userRole === "ADMIN";
  let isSuperAdmin = userRole === "SUPERADMIN";
  let isUser = userRole === "USER";
  let isDoctor = userRole === "DOCTOR";
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      let data;
      if (isUser) {
        data = await getCurrentUserData(user.staffId);
      } else {
        data = await getCurrentStaffData(user.staffId);
      }
      setUserData(data);
    };

    fetchUserData();
  });

  const handleAddPatient = async (patientData) => {
    const newPatientData = { ...patientData, userId: user.staffId };
    console.log("rayh post data", newPatientData);
    // await axios.post("", newPatientData);
    const response = await fetch("http://localhost:5023/api/v1/Patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatientData),
    });
    const data = await response.json();
    console.log("bayz", data);
    const updatedUserData = await getCurrentUserData(user.staffId);
    setUserData(updatedUserData);
    setIsModalOpen(false);
  };

  if (isUser) {
    return (
      <>
        <Heading as="h1">
          {user.firstName} {user.lastName} - {user.role}
        </Heading>

        <Button
          variation="secondary"
          size="medium"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Patient
        </Button>

        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>First Name</StyledTh>
              <StyledTh>Last Name</StyledTh>
              <StyledTh>Age</StyledTh>
              <StyledTh>Relation</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {userData?.patients.map((patient) => (
              <StyledTr key={patient.patientId}>
                <StyledTd>{patient.firstName}</StyledTd>
                <StyledTd>{patient.lastName}</StyledTd>
                <StyledTd>{patient.age}</StyledTd>
                <StyledTd>{patient.userRelation}</StyledTd>
              </StyledTr>
            ))}
          </StyledTbody>
        </StyledTable>

        {isModalOpen && (
          <Modal>
            <AddPatientForm onSubmit={handleAddPatient} />
            <Button
              type="submit"
              variation="primary"
              size="medium"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </Modal>
        )}
        <Row>
          <Heading as="h3">Update your data</Heading>
          <UpdateUserDataForm />
        </Row>

        <Row>
          <Heading as="h3">Update your password</Heading>
          <UpdatePasswordForm />
        </Row>
      </>
    );
  }
  if (isAdmin || isSuperAdmin || isDoctor) {
    return (
      <>
        <Heading as="h1">
          {user.firstName} {user.lastName} - {user.role}
        </Heading>

        <Row>
          <Heading as="h3">Update your data</Heading>
          <UpdateUserDataForm />
        </Row>

        <Row>
          <Heading as="h3">Update your password</Heading>
          <UpdatePasswordForm />
        </Row>
      </>
    );
  }
}

export default Account;
