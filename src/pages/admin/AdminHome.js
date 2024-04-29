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

  import AdminLogin from "./AdminLogin";

const AdminHome = () => {
  return (
    <div style = {{width : '100%'}}>
           <Container maxW="xl" centerContent>
      {/* <Box
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
      </Box> */}
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          
          <TabPanels>
            <TabPanel>
              <AdminLogin />
            </TabPanel>
            
          </TabPanels>
        </Tabs>
      </Box>
    </Container>

      
    </div>
  )
}

export default AdminHome
