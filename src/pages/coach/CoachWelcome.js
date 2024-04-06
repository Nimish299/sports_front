import { NavLink, Link } from "react-router-dom";
import CoachLogin from "./CoachLogin";
import CoachSignup from "./CoachSignup";
import {
  Container,
  Box,
  Text,
  Center,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

const CoachWelcome = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Center bg="tomato" h="100px" color="white">
          <Text justifyContent="center" fontSize="4xl" fontFamily="Work Sans">
            Coach Homepage
          </Text>
        </Center>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CoachLogin />
            </TabPanel>
            <TabPanel>
              <CoachSignup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default CoachWelcome;
