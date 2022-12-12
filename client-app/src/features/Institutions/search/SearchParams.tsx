import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import { CheckboxProps, Form, Item, Radio, Segment } from 'semantic-ui-react';

export default function SearchParams() {
    // list of Specialties will be mapped into radio buttons
    const specialties = ["sp1", "sp2", "sp3"];

    const [radio, setRadio] = useState<any>(() => {
        let initialState = {}
        specialties.map(specialty => {
            initialState = { ...initialState, [specialty]: 0 }
        })
        return initialState;
    });

    function handleInputChange(event: ChangeEventHandler<HTMLInputElement>) {
        // console.log(event.currentTarget.value);
        // setRadio({ ...radio, [event.currentTarget.name]: event.currentTarget.value });
    }
    return (
        <Segment>
            <Form>
                {specialties.map(specialty => (
                    <Form.Field key={specialty}>
                        <Radio
                            label={specialty}
                            name={specialty}
                            value={0}
                            checked={radio[specialty].value === 1}
                            // onChange={handleInputChange}
                        />
                    </Form.Field>
                ))}
            </Form>
        </Segment>
    )
}