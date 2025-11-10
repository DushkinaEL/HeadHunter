
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Box, Card, Text, Button, Container } from "@mantine/core";
import catGif from "../../assets/sad-cat.gif"
import styles from "./ErrorPage.module.css";

export function ErrorPage() {
  const error = useRouteError();

  let title = "Упс! Такой страницы не существует";
  let message = "Давайте перейдём к началу.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Упс! Такой страницы не существует";
      message = "Давайте перейдём к началу.";
    } else {
      title = `Ошибка ${error.status}`;
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (

      <Container size="md" className={styles.wrapper}>
        <Card radius="md" className={styles.card}>
          <Box className={styles.cardInner}>
            <Box>
              <Text className={styles.title}>{title}</Text>
              <Text className={styles.subtitle}>{message}</Text>
            </Box>
            <Box className={styles.actions}>
              <Button component={Link} to="/" className={styles.buttonToMain}>
                На главную
              </Button>
            </Box>
          </Box>
          <Box className={styles.media}>
            <img src={catGif} alt="cat" className={styles.media} />
          </Box>
        </Card>
      </Container>
  );
}