import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	onChange: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (container.current) {
			if (open) container.current.classList.add(clsx(styles.container_open));
			else container.current.classList.remove(clsx(styles.container_open));
		}
	}, [open]);

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		handleChange(defaultArticleState);
	};

	const handleChange = (articleState: ArticleStateType) => {
		props.onChange(articleState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		handleChange({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={() => setOpen(!open)} />
			<aside ref={container} className={styles.container}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Text family={'open-sans'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.optionsContainer}>
						<Select
							selected={fontFamily}
							onChange={setFontFamily}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
						<RadioGroup
							selected={fontSize}
							name='fontSize'
							onChange={setFontSize}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
						<Select
							selected={fontColor}
							onChange={setFontColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>
					<div className={styles.optionsContainer}>
						<Select
							selected={backgroundColor}
							onChange={setBackgroundColor}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={contentWidth}
							onChange={setContentWidth}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							onClick={handleReset}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
