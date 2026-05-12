import styled from 'styled-components';
export const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
`;

export const ProfileTitle = styled.h2`
const  text-align: center;
  margin-bottom: 20px;
`;

export const ProfileInfoItem = styled.div`
  margin-bottom: 12px;
`;

export const ProfileLabel = styled.span`
  font-weight: 600;
`;

export const ProfileValue = styled.span`
  margin-left: 8px;
`;

export const ProfileButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const ProfileErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
`;
