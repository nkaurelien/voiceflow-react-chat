import 'react-calendar/dist/Calendar.css';

import { Chat, ChatWindow, Launcher, RuntimeAPIProvider, SessionStatus, SystemResponse, TurnType, UserResponse } from '@voiceflow/react-chat';
import { useContext, useState } from 'react';
import { match } from 'ts-pattern';

import { LiveAgentStatus } from './components/LiveAgentStatus.component';
import { StreamedMessage } from './components/StreamedMessage.component';
import { RuntimeContext } from './context';
import { CustomMessage } from './custom-message.enum';
import { CalendarMessage } from './messages/CalendarMessage.component';
import { VideoMessage } from './messages/VideoMessage.component';
import { AppContainer, CenterContainer, DemoContainer } from './styled';
import { useLiveAgent } from './use-live-agent.hook';

const IMAGE = 'https://picsum.photos/seed/1/200/300';
const AVATAR = 'https://picsum.photos/seed/1/192/192';

export const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { runtime } = useContext(RuntimeContext)!;
  const liveAgent = useLiveAgent();

  const handleLaunch = async () => {
    setOpen(true);
    await runtime.launch();
  };

  const handleEnd = () => {
    runtime.setStatus(SessionStatus.ENDED);
    setOpen(false);
  };

  const handleSend = (message: string) => {
    if (liveAgent.isEnabled) {
      liveAgent.sendUserReply(message);
    } else {
      runtime.reply(message);
    }
  };

  if (!open) {
    handleLaunch().then()
    return (
      <span></span>
    )

    // return (
    //   <span
    //     style={{
    //       position: 'fixed',
    //       top: '2rem',
    //       bottom: '2rem',
    //     }}
    //   >
    //     <Launcher onClick={handleLaunch} />
    //   </span>
    // );
  }

  // handleLaunch().then()

  return (
    <CenterContainer>

      <AppContainer>
        <ChatWindow.Container>
          <RuntimeAPIProvider {...runtime}>
            <Chat
              title="SDP"
              description="Bienvenue sur SDP "
              image={IMAGE}
              avatar={AVATAR}
              withWatermark={false}
              startTime={runtime.session.startTime}
              hasEnded={runtime.isStatus(SessionStatus.ENDED)}
              isLoading={!runtime.session.turns.length}
              onStart={runtime.launch}
              onEnd={handleEnd}
              onSend={handleSend}
              onMinimize={handleEnd}
            >
              {liveAgent.isEnabled && <LiveAgentStatus talkToRobot={liveAgent.talkToRobot} />}
              {runtime.session.turns.map((turn, turnIndex) =>
                match(turn)
                  .with({ type: TurnType.USER }, ({ id, type: _, ...rest }) => <UserResponse {...rest} key={id} />)
                  .with({ type: TurnType.SYSTEM }, ({ id, type: _, ...rest }) => (
                    <SystemResponse
                      {...rest}
                      key={id}
                      Message={({ message, ...props }) =>
                        match(message)
                          .with({ type: CustomMessage.CALENDAR }, ({ payload: { today } }) => (
                            <CalendarMessage {...props} value={new Date(today)} runtime={runtime} />
                          ))
                          .with({ type: CustomMessage.VIDEO }, ({ payload: url }) => <VideoMessage url={url} />)
                          .with({ type: CustomMessage.STREAMED_RESPONSE }, ({ payload: { getSocket } }) => <StreamedMessage getSocket={getSocket} />)
                          .with({ type: CustomMessage.PLUGIN }, ({ payload: { Message } }) => <Message />)
                          .otherwise(() => <SystemResponse.SystemMessage {...props} message={message} />)
                      }
                      avatar={AVATAR}
                      isLast={turnIndex === runtime.session.turns.length - 1}
                    />
                  ))
                  .exhaustive()
              )}
              {runtime.indicator && <SystemResponse.Indicator avatar={AVATAR} />}
            </Chat>
          </RuntimeAPIProvider>
        </ChatWindow.Container>
      </AppContainer>
    </CenterContainer>

  );
};
