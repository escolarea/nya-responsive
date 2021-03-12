import React, {Component} from 'react'
import Link from "next/link";

const GlobalMenuIcon = () => {
        return (
            <Link href="/menu"><div className="item"><img src="/static/images/global-menu/global-menu-icon-hl.png"/></div></Link>
        )
}

export default GlobalMenuIcon;