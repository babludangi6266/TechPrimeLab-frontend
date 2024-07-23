import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

const CardComponent = ({
  ProjectName,
  StartDate,
  EndDate,
  Reason,
  Type,
  Division,
  Category,
  Priority,
  Department,
  Location,
  Status,
  handleUpdate,
  id,
}) => {
  const monthNumberToWord = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Months are zero-based in JavaScript Date object
    return date.toLocaleString("en-US", { month: "short" });
  };

  return (
    <>
      <Card mb={5} boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" w={"95%"} align="center">
        <CardHeader
          mb={"-8"}
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex textAlign={"left"} direction="column">
            <Heading color={"gray.700"} size="sm">
              {ProjectName}
            </Heading>
            <Text color={"gray.500"} fontSize="12px">
              {monthNumberToWord(StartDate.slice(6, 7))}
              {StartDate.slice(7, 10)}, {StartDate.slice(0, 4)} to{" "}
              {monthNumberToWord(EndDate.slice(6, 7))}
              {EndDate.slice(7, 10)}, {EndDate.slice(0, 4)}
            </Text>
          </Flex>
          <Box textAlign={"right"}>
            <Heading color={"gray.700"} fontSize={"13px"}>
              {Status}
            </Heading>
          </Box>
        </CardHeader>
        <CardBody
          // gap={3}
          mt={0}
          fontSize={"14px"}
          w={"100%"}
          textAlign={"left"}
        >
          <Text mb={1} color={"gray.500"} textAlign={"left"}>
            Reason:
            <span style={{ color: "black", marginLeft: "5px" }}>{Reason}</span>
          </Text>

          <Flex mb={1} alignItems={"center"} gap={1}>
            <Text color={"gray.500"}>
              Type:
              <span style={{ color: "black", marginLeft: "5px" }}>{Type}</span>
            </Text>
            <Box width="5px" height="5px" borderRadius="50%" bg="gray.500" />
            <Text color={"gray.500"}>
              Category:
              <span style={{ color: "black", marginLeft: "5px" }}>
                {Category}
              </span>
            </Text>
          </Flex>

          <Flex mb={1} alignItems={"center"} gap={1}>
            <Text color={"gray.500"}>
              Division:
              <span style={{ color: "black", marginLeft: "5px" }}>
                {Division}
              </span>
            </Text>
            <Box width="5px" height="5px" borderRadius="50%" bg="gray.500" />
            <Text color={"gray.500"}>
              Dept:
              <span style={{ color: "black", marginLeft: "5px" }}>
                {Department}
              </span>
            </Text>
          </Flex>

          <Text mb={1} color={"gray.500"}>
            Location:
            <span style={{ color: "black", marginLeft: "5px" }}>
              {Location}
            </span>
          </Text>

          <Text color={"gray.500"}>
            Priority:
            <span style={{ color: "black", marginLeft: "5px" }}>
              {Priority}
            </span>
          </Text>
        </CardBody>
        <CardFooter>
          <Flex
            mt={-5}
            gap={4}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Button
              size={"md"}
              borderRadius={20}
              colorScheme="blue"
              variant={"solid"}
              px={6}
              fontWeight={400}
              onClick={() => handleUpdate("Running", id)}
            >
              Start
            </Button>
            <Button
              size={"md"}
              borderRadius={20}
              colorScheme="blue"
              variant={"outline"}
              px={5}
              fontWeight={400}
              onClick={() => handleUpdate("Closed", id)}
            >
              Close
            </Button>
            <Button
              size={"md"}
              borderRadius={20}
              colorScheme="blue"
              fontWeight={400}
              variant={"outline"}
              onClick={() => handleUpdate("Cancelled", id)}
            >
              Cancel
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardComponent;