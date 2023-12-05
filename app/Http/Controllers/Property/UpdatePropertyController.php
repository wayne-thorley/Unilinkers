<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\UpdatePropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;

class UpdatePropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdatePropertyRequest $request, Property $property)
    {
        $this->authorize('update', $property);

        $property->update($request->only([
            'name',
            'address',
        ]));

        return new PropertyResource($property);
    }
}
