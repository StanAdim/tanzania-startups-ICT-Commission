<?php

namespace App\Http\Controllers;

use App\Exports\AcceleratorsExport;
use App\Exports\GrassrootProgrammesExport;
use App\Exports\HubsExport;
use App\Exports\ParticipantsExport;
use App\Exports\StartupsExport;
use App\Exports\UsersExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class FileExportController extends Controller
{
    //
    public function exportProfile($type) {
        $filePath = 'documents/excels/'.$type.'.xlsx';
        switch ($type) {
            case "startups":
                Excel::store(new StartupsExport, $filePath);
                break;
            case "grassroots":
                Excel::store(new GrassrootProgrammesExport, $filePath);
                break;
            case "hubs":
                Excel::store(new HubsExport, $filePath);
                break;
            case "accelerators":
                Excel::store(new AcceleratorsExport, $filePath);
                break;
            case "users":
                Excel::store(new UsersExport, $filePath);
                break;
            default:
                // Code to execute if no case matches
                return [];
                break;
        }
        return response() ->json(['path' => $filePath]);

//        $filePath = 'documents/excels/event_participants.xlsx';
        // return Conference::where('id', $request-> conference_id );
//        Excel::store(new ParticipantsExport($request -> conference_id), $filePath);
//        return response() ->json(['path' => $filePath]);
    }
    public function downloadFile(Request $request){
        // return $request
        $file_name = $request->name;
        if ($file_name == null) {
            abort(404);
        }

        if (!Storage::disk('local')->exists($file_name)) {
            abort(404);
        }
        $pdfPath = storage_path('app/'. $file_name);
        return response()->file($pdfPath);
    }
}
