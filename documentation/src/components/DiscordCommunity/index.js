import styles from "../../pages/index.module.css";
import Discord from "../../../static/img/discord_logo.svg";
import {projectsCourseLabel} from "../../config/courseIdentity";
import Admonition from "@theme/Admonition";
import Figure from "../Figure";
import React from "react";

export function DiscordCommunity() {
    return <section className={styles.discordSection} aria-labelledby="discord-community">
            <div className={styles.discordHero}>
                <div className={styles.discordCopy}>
                    <div className={styles.discordHeading}>
                        <div className={styles.discordLogoWrap} aria-hidden="true">
                            <Discord className={styles.discordLogo}/>
                        </div>
                        <h2 id="discord-community">Discord Community</h2>
                    </div>
                    <p>
                        In this class, Discord will be the host for team communication as well as
                        communication with
                        your instructors and peers.
                    </p>
                    <p>
                        You are free to conduct team meetings, have discussions about your projects, get
                        advice, or
                        talk with your instructors using this platform. In addition, you may talk about
                        your projects
                        and assignments with other students in all the sections of
                        the {projectsCourseLabel}.
                    </p>
                </div>
            </div>

            <Admonition type={"important"}>
                Please make sure that you change your nickname to your full name!
            </Admonition>

            <div className={styles.discordDetails}>
                <div className={styles.discordQrCard}>
                    <Figure
                        src={"https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://discord.com/invite/97hbYEH5"}
                        caption={"Scan QR Code above to join Discord Server"}
                    />
                </div>
                <div className={styles.discordWidgetCard}>
                    <div className={styles.discordCta}>
                        <h3>Join the Discord</h3>
                        <p>
                            Get announcements, team updates, and fast help from instructors and
                            classmates.
                        </p>
                        <a
                            className="button button--primary button--lg"
                            href="https://discord.com/invite/97hbYEH5"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Join Discord
                        </a>
                    </div>
                </div>
            </div>
        </section>;
}
