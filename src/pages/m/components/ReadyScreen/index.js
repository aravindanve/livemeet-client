import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMeetingContext } from "../../../../contexts/meeting";
import Layout from "../../../components/Layout";
import TrackControls from "../TrackControls";
import TrackView from "../TrackView";
import ReadyStep1 from "./ReadyStep1";
import ReadyStep2 from "./ReadyStep2";

export default function ReadyScreen() {
  const [meetingState] = useMeetingContext();
  const [state, setState] = useState({
    joining: false,
    joinData: {},
  });

  const onJoinClick = (data) => {
    setState((state) => ({
      ...state,
      joining: true,
      joinData: data,
    }));
  };

  return (
    <Layout type="wide" alignItems="center">
      <Flex
        flexGrow={1}
        direction="column"
        justifyContent="center"
        mx={[3, 6]}
        my={[8, 3]}
      >
        <Box textAlign={["center", "start"]} mb={6}>
          <Heading size="lg">Get ready</Heading>
          <Text mt={1}>
            Configure your camera and microphone and make sure you look your
            best!
          </Text>
        </Box>

        <Flex flexGrow={1} direction={["column", "row"]} gap={6}>
          <Flex flexGrow={1} direction="column" width={["100%", "50%"]}>
            <TrackView
              videoTrack={meetingState.localVideoTrack}
              isAudioMuted={meetingState.localAudioTrackMuted}
              isVideoMuted={meetingState.localVideoTrackMuted}
              isLocal={true}
              isPreview={true}
            />
            <Flex justifyContent="center" gap={3} p={3}>
              <TrackControls />
            </Flex>
          </Flex>
          <Flex
            flexGrow={1}
            width={["100%", "50%"]}
            direction="column"
            pb={[0, 16]}
          >
            {!state.joining ? (
              <ReadyStep1 joinData={state.joinData} onJoinClick={onJoinClick} />
            ) : (
              <ReadyStep2 joinData={state.joinData} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
