import * as React from 'react';
import Table from './Table';
import { H1, H2 } from '@blueprintjs/core';


export default function Home({}) {
	return (
		<div className="container">
			<div className="col-12">
				<H1 className="page-h1">Головна</H1>
				<H2>Курсова робота студента групи ПЗ-31з</H2>
				<H2>Ничкало Ярослава</H2>
			</div>
		</div>
	);
}