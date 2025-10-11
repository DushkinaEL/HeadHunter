import { Pill, Button, TextInput,  Text, Box } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import styles from './SkillsFilter.module.css';

type Props = {
  skills: string[];
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
};

export function SkillsFilter({ skills, addSkill, removeSkill }: Props) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const skill = input.trim();
    if (
      skill &&
      !skills.some(s => s.trim().toLowerCase() === skill.toLowerCase())
    ) {
      addSkill(skill);
      setInput('');
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className={styles.skillsFilter}>
      <Text className={styles.title}>
        Ключевые навыки
      </Text>
      <div className={styles.inputGroup}>
        <TextInput
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Навык"
          radius="md"
          size="xs"
          className={styles.input}
          classNames={{ input: styles.inputField }}
        />
        <Button
          onClick={handleAdd}
          color="primary"
          className={styles.addButton}
          radius="md"
          size="sm"
          aria-label="Добавить навык"
        >
          <IconPlus size={20} />
        </Button>
      </div>
      <Box className={styles.skillsList}>
        {skills.map(skill => (
          
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => removeSkill(skill)}
            color="gray"
            radius="lg"
            size="md"
            className={styles.pill}
            classNames={{ remove: styles.pillRemove }}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeButtonProps={{ 'data-testid': `remove-skill-${skill}` } as any}
          >
            {skill}
          </Pill>
        ))}
      </Box>
    </div>
  );
}