import { PropsWithChildren, useEffect } from "react";

import styles from "./Header.module.css";

type HeaderProps = {
    title: string;
};

/**
 * A header component that also changes the document title based on the title prop
 * @param HeaderProps
 * @returns JSX.Element
 */
export const Header = ({ title, children }: PropsWithChildren<HeaderProps>) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className={styles.header}>
            <h1>{title}</h1>
            {children}
        </div>
    );
};
