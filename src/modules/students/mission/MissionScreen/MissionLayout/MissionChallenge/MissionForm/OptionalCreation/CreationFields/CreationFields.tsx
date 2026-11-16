import { type CreationFieldsProps } from './creation-fields-types';
import { CreationChoices } from './CreationChoices/CreationChoices';
import { CreatedStory } from './CreatedStory/CreatedStory';

export function CreationFields(props: CreationFieldsProps) {
  return (
    <fieldset
      className="creation-fields [border:0] p-0 mt-[1.6875rem] mr-0 mb-0 ml-0 min-w-0 [&_legend]:font-semibold [&_legend]:text-support [&_legend]:mb-3"
      disabled={props.disabled}
    >
      <legend>Crie seu problema</legend>
      <CreationChoices {...props} />
      <CreatedStory {...props} />
    </fieldset>
  );
}
