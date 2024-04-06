import React from "react";
import PlayerLogin from "./PlayerLogin";
import PlayerSignup from "./PlayerSignup";
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

const PlayerWelcome = () => {
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
            Player Homepage
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
              <PlayerLogin />
            </TabPanel>
            <TabPanel>
              <PlayerSignup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default PlayerWelcome;
