import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.stereotype.Component;

@Component
public class ApplicationShutdownHook implements ApplicationListener<ContextClosedEvent> {

    @Override
    public void onApplicationEvent(ContextClosedEvent event) {
        // Perform cleanup tasks here, such as releasing the port
        // For example, if you're using an embedded web server like Tomcat
        // you can stop the server gracefully, which will release the port
        // TomcatEmbeddedServletContainerFactory tomcatFactory = event.getApplicationContext().getBean(TomcatEmbeddedServletContainerFactory.class);
        // tomcatFactory.stop();

        System.out.println("Application is shutting down...");
    }
}