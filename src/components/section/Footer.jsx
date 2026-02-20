import React from 'react'
import { Link } from 'react-router-dom';

import '../../asserts/scss/section/_layout.scss'
import '../../asserts/scss/section/_footer.scss'

const Footer = () => {
    return (
        <footer id='footer' role="contentinfo"> 
            <div className='footer_container'>
                <div className='footer-title'>
                    <h4>Reviewing</h4>
                    <p>모든 강의를 한 곳에서 비교하고 선택하세요.</p>
                </div>
                <div className='footer-menu'>
                    <ul>
                        <li>
                            <Link>
                                서비스 소개
                            </Link>
                        </li>
                        <li>
                            <Link>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link>
                                GitHub
                            </Link>
                        </li>
                        <li>
                            <Link>
                                이용약관
                            </Link>
                        </li>
                        <li>
                            <Link>
                                개인정보처리방침
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='website-information'>
                © 2025 Reviewing. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer